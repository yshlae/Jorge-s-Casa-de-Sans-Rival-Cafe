// Firestore access for the `report_summaries` collection.
// Collection: report_summaries/{period} -> {
//   period, totalRevenue, revenueChangePercent, totalOrders,
//   orderChangePercent, branchBreakdown
// }
// Two documents total: report_summaries/monthly and report_summaries/weekly.
//
// Backs the Owner > Reports screen's Monthly/Weekly toggle.
// Falls back to local mock data if Firestore is unreachable.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/report_summary.dart';
import '../utils/stream_fallback.dart';

class ReportSummaryService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('report_summaries');

  Stream<ReportSummary?> watchSummary(ReportPeriod period) {
    final docId = period == ReportPeriod.weekly ? 'weekly' : 'monthly';
    final mock = period == ReportPeriod.weekly ? mockWeeklyReport : mockMonthlyReport;
    return withMockFallback(
      source: _collection.doc(docId).snapshots().map((snapshot) {
        final data = snapshot.data();
        if (data == null) return null;
        return ReportSummary.fromMap(data);
      }),
      mockData: mock,
    );
  }
}