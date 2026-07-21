// Backs the Owner > Resources tab: the "Overall Utilization" donut and the
// "AI Restocking Recommendations" cards.
//
// The utilization percent and critical count intentionally reuse
// dashboard_metrics — they're the same "87% · 2 Critical" figures shown on
// both the Dashboard's Key Metrics card and this screen's donut, so there's
// no separate `resources` collection for just those two numbers.

import 'dart:async';
import 'package:flutter/foundation.dart';
import '../models/dashboard_metrics.dart';
import '../models/resource_recommendation.dart';
import '../services/dashboard_metrics_service.dart';
import '../services/resource_recommendation_service.dart';

class ResourcesState extends ChangeNotifier {
  final DashboardMetricsService _metricsService = DashboardMetricsService();
  final ResourceRecommendationService _recommendationService =
      ResourceRecommendationService();

  StreamSubscription<DashboardMetrics?>? _metricsSub;
  StreamSubscription<List<ResourceRecommendation>>? _recommendationsSub;

  DashboardMetrics? _metrics;
  List<ResourceRecommendation> _recommendations = [];

  int? get overallUtilizationPercent => _metrics?.resourceStatusPercent;
  int? get criticalResourceCount => _metrics?.criticalResourceCount;
  List<ResourceRecommendation> get recommendations => _recommendations;
  bool get isLoading => _metrics == null;

  ResourcesState() {
    _metricsSub = _metricsService.watchMetrics().listen((data) {
      _metrics = data;
      notifyListeners();
    });
    _recommendationsSub =
        _recommendationService.watchRecommendations().listen((data) {
      _recommendations = data;
      notifyListeners();
    });
  }

  @override
  void dispose() {
    _metricsSub?.cancel();
    _recommendationsSub?.cancel();
    super.dispose();
  }
}