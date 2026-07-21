// Firestore access for the `dashboard_metrics` collection.
// Single-document collection: dashboard_metrics/current -> {
//   totalRevenue, revenueChangePercent, productionOutput,
//   productionChangePercent, demandForecast, demandForecastChangePercent,
//   resourceStatusPercent, criticalResourceCount
// }
//
// Backs the 2x2 Key Metrics grid on the Owner Dashboard.
// Falls back to local mock data if Firestore is unreachable.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/dashboard_metrics.dart';
import '../utils/stream_fallback.dart';

class DashboardMetricsService {
  final DocumentReference<Map<String, dynamic>> _doc =
      FirebaseFirestore.instance.collection('dashboard_metrics').doc('current');

  Stream<DashboardMetrics?> watchMetrics() {
    return withMockFallback(
      source: _doc.snapshots().map((snapshot) {
        final data = snapshot.data();
        if (data == null) return null;
        return DashboardMetrics.fromMap(data);
      }),
      mockData: mockDashboardMetrics,
    );
  }
}