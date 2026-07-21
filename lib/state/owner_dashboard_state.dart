// Backs the Owner > Dashboard tab: branch filter chips, branch performance
// cards, Key Metrics grid, and Recent Orders list.

import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/branch.dart';
import '../models/branch_performance.dart';
import '../models/dashboard_metrics.dart';
import '../models/recent_order.dart';
import '../services/branch_service.dart';
import '../services/branch_performance_service.dart';
import '../services/dashboard_metrics_service.dart';
import '../services/recent_order_service.dart';

class OwnerDashboardState extends ChangeNotifier {
  final BranchService _branchService = BranchService();
  final BranchPerformanceService _branchPerformanceService =
      BranchPerformanceService();
  final DashboardMetricsService _metricsService = DashboardMetricsService();
  final RecentOrderService _recentOrderService = RecentOrderService();

  StreamSubscription<List<Branch>>? _branchSub;
  StreamSubscription<List<BranchPerformance>>? _performanceSub;
  StreamSubscription<DashboardMetrics?>? _metricsSub;
  StreamSubscription<List<RecentOrder>>? _ordersSub;

  List<Branch> _branches = [];
  List<BranchPerformance> _allPerformance = [];
  DashboardMetrics? _metrics;
  List<RecentOrder> _allOrders = [];

  /// null = "All Branches" chip selected (the default).
  String? _selectedBranchId;

  List<Branch> get branches => _branches;
  DashboardMetrics? get metrics => _metrics;
  String? get selectedBranchId => _selectedBranchId;
  bool get isLoading => _metrics == null;

  /// Branch Performance cards, filtered to the selected branch if any.
  List<BranchPerformance> get visiblePerformance {
    if (_selectedBranchId == null) return _allPerformance;
    return _allPerformance
        .where((p) => p.branchId == _selectedBranchId)
        .toList();
  }

  /// Recent Orders, filtered by branch name if a branch chip is selected.
  List<RecentOrder> get visibleOrders {
    if (_selectedBranchId == null) return _allOrders;
    final branchName = _branches
        .firstWhere(
          (b) => b.id == _selectedBranchId,
          orElse: () => const Branch(id: '', name: ''),
        )
        .name;
    return _allOrders.where((o) => o.branchName == branchName).toList();
  }

  OwnerDashboardState() {
    _branchSub = _branchService.watchBranches().listen((data) {
      _branches = data;
      notifyListeners();
    });
    _performanceSub = _branchPerformanceService.watchAll().listen((data) {
      _allPerformance = data;
      notifyListeners();
    });
    _metricsSub = _metricsService.watchMetrics().listen((data) {
      _metrics = data;
      notifyListeners();
    });
    _ordersSub = _recentOrderService.watchRecentOrders().listen((data) {
      _allOrders = data;
      notifyListeners();
    });
  }

  /// Called when the user taps a branch filter chip. Pass null for
  /// "All Branches".
  void selectBranch(String? branchId) {
    _selectedBranchId = branchId;
    notifyListeners();
  }

  @override
  void dispose() {
    _branchSub?.cancel();
    _performanceSub?.cancel();
    _metricsSub?.cancel();
    _ordersSub?.cancel();
    super.dispose();
  }
}