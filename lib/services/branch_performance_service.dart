// Firestore access for the `branch_performance` collection.
// Collection: branch_performance/{branchId} -> { branchName, tagline, revenue, productionUnits, orderCount }
//
// Backs the "Branch Performance" cards on the Owner Dashboard.
// Falls back to local mock data if Firestore is unreachable.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/branch_performance.dart';
import '../utils/stream_fallback.dart';

class BranchPerformanceService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('branch_performance');

  Stream<List<BranchPerformance>> watchAll() {
    return withMockFallback(
      source: _collection.snapshots().map((snapshot) => snapshot.docs
          .map((doc) => BranchPerformance.fromMap(doc.id, doc.data()))
          .toList()),
      mockData: mockBranchPerformance,
    );
  }
}