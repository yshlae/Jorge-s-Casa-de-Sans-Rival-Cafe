// Backs the Owner > Reports tab: the Monthly/Weekly toggle, revenue/orders
// trend cards, and Branch Breakdown bars.

import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/report_summary.dart';
import '../services/report_summary_service.dart';

class ReportsState extends ChangeNotifier {
  final ReportSummaryService _service = ReportSummaryService();

  StreamSubscription<ReportSummary?>? _sub;
  ReportSummary? _summary;
  ReportPeriod _selectedPeriod = ReportPeriod.monthly;

  ReportPeriod get selectedPeriod => _selectedPeriod;
  ReportSummary? get summary => _summary;
  bool get isLoading => _summary == null;

  ReportsState() {
    _subscribe();
  }

  void _subscribe() {
    _sub?.cancel();
    _summary = null;
    _sub = _service.watchSummary(_selectedPeriod).listen((data) {
      _summary = data;
      notifyListeners();
    });
  }

  /// Called when the user taps the Monthly/Weekly toggle.
  void selectPeriod(ReportPeriod period) {
    if (period == _selectedPeriod) return;
    _selectedPeriod = period;
    notifyListeners(); // reflect the toggle immediately, even before data loads
    _subscribe();
  }

  @override
  void dispose() {
    _sub?.cancel();
    super.dispose();
  }
}