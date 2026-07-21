// Backs all three Staff screens: Shift & Stock Check, Stock Adjustment,
// and Sales Snapshot. Scoped to a single branch — call `initialize()` once
// after login with the logged-in staff member's branchId.

import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/inventory_item.dart';
import '../models/sales_summary.dart';
import '../models/stock_adjustment_log.dart';
import '../services/inventory_service.dart';
import '../services/sales_service.dart';
import '../services/stock_adjustment_service.dart';

class StaffState extends ChangeNotifier {
  final InventoryService _inventoryService = InventoryService();
  final SalesService _salesService = SalesService();
  final StockAdjustmentService _adjustmentService = StockAdjustmentService();

  StreamSubscription<List<InventoryItem>>? _itemsSub;
  StreamSubscription<List<SalesSummary>>? _salesSub;

  String? _branchId;
  String? _branchName;
  bool _shiftStarted = false;
  List<InventoryItem> _items = [];
  List<SalesSummary> _salesSummaries = [];
  bool _isSaving = false;
  String? _errorMessage;

  String? get branchName => _branchName;
  bool get shiftStarted => _shiftStarted;
  List<InventoryItem> get items => _items;
  bool get isSaving => _isSaving;
  String? get errorMessage => _errorMessage;
  bool get isLoading => _branchId != null && _items.isEmpty;

  /// Today's sales snapshot for this branch (null if nothing seeded yet
  /// for this branch/date).
  SalesSummary? get todaysSales =>
      _salesSummaries.isNotEmpty ? _salesSummaries.first : null;

  /// Call once after login with the staff member's assigned branch. Safe
  /// to call again — it's a no-op if already watching the same branch.
  void initialize({required String branchId, required String branchName}) {
    if (_branchId == branchId) return;
    _branchId = branchId;
    _branchName = branchName;
    _shiftStarted = false;

    _itemsSub?.cancel();
    _itemsSub = _inventoryService.watchItemsForBranch(branchId).listen((data) {
      _items = data;
      notifyListeners();
    });

    _salesSub?.cancel();
    _salesSub = _salesService.watchSummariesForBranch(branchId).listen((data) {
      _salesSummaries = data;
      notifyListeners();
    });

    notifyListeners();
  }

  /// Used by the "Start Shift" button — purely local state, no Firestore
  /// collection for shifts exists yet.
  void startShift() {
    _shiftStarted = true;
    notifyListeners();
  }

  /// Used by the Stock Adjustment screen's Save button. Updates the live
  /// stock count AND writes a log entry in one call, so the Staff and
  /// Owner sides both stay in sync from a single action.
  Future<bool> submitAdjustment({
    required InventoryItem item,
    required AdjustmentType type,
    required int amount,
    required String staffName,
  }) async {
    if (amount <= 0) {
      _errorMessage = 'Enter an amount greater than zero.';
      notifyListeners();
      return false;
    }

    _isSaving = true;
    _errorMessage = null;
    notifyListeners();

    try {
      int newStock;
      if (type == AdjustmentType.restock) {
        newStock = item.currentStock + amount;
      } else {
        newStock = item.currentStock - amount;
        if (newStock < 0) newStock = 0;
      }

      await _inventoryService.updateStock(item.id, newStock);
      await _adjustmentService.addLog(StockAdjustmentLog(
        id: '', // Firestore assigns the real document ID on add()
        itemName: item.name,
        branchName: _branchName ?? '',
        type: type,
        amount: amount,
        unit: item.unit,
        staffName: staffName,
        timestamp: DateTime.now(),
      ));

      _isSaving = false;
      notifyListeners();
      return true;
    } catch (e) {
      _isSaving = false;
      _errorMessage = 'Failed to save adjustment. Please try again.';
      notifyListeners();
      return false;
    }
  }

  @override
  void dispose() {
    _itemsSub?.cancel();
    _salesSub?.cancel();
    super.dispose();
  }
}