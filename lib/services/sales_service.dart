// Firestore access for the `sales_summaries` collection.
// Collection: sales_summaries/{summaryId} -> { branchId, date, revenue, transactionCount, topProducts }
//
// Backs the Staff's Sales Snapshot screen. Falls back to local mock data
// if Firestore is unreachable.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/sales_summary.dart';
import '../utils/stream_fallback.dart';

class SalesService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('sales_summaries');

  Stream<List<SalesSummary>> watchSummariesForBranch(String branchId) {
    return withMockFallback(
      source: _collection
          .where('branchId', isEqualTo: branchId)
          .snapshots()
          .map((snapshot) => snapshot.docs
              .map((doc) => SalesSummary.fromMap(doc.id, doc.data()))
              .toList()),
      mockData: mockSalesSummariesForBranch(branchId),
    );
  }
}