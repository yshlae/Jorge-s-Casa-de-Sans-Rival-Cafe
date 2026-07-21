// Firestore access for the `branches` collection.
// Collection: branches/{branchId} -> { name }
//
// watchBranches() falls back to local mock data if Firestore doesn't
// respond within a few seconds — see utils/stream_fallback.dart.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/branch.dart';
import '../utils/stream_fallback.dart';

class BranchService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('branches');

  Stream<List<Branch>> watchBranches() {
    return withMockFallback(
      source: _collection.snapshots().map((snapshot) => snapshot.docs
          .map((doc) => Branch.fromMap(doc.id, doc.data()))
          .toList()),
      mockData: mockBranches,
    );
  }

  Future<List<Branch>> fetchBranches() async {
    return withMockFallbackFuture(
      source: () async {
        final snapshot = await _collection.get();
        return snapshot.docs.map((doc) => Branch.fromMap(doc.id, doc.data())).toList();
      },
      mockData: mockBranches,
    );
  }
}