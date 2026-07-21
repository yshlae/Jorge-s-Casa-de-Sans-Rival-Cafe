// Firestore access for the `users` collection.
// Collection: users/{userId} -> { name, role, branchId }
//
// This is the MOST IMPORTANT service to have a working fallback for — if
// Firestore is unreachable and login can't resolve a user, nobody gets
// past the login screen at all. fetchUserById falls back to the matching
// mock user (mockUsersById) if Firestore doesn't respond in time.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/user.dart';
import '../utils/stream_fallback.dart';

class UserService {
  CollectionReference<Map<String, dynamic>> get _collection =>
      FirebaseFirestore.instance.collection('users');

  Future<List<AppUser>> fetchUsers() async {
    return withMockFallbackFuture(
      source: () async {
        final snapshot = await _collection.get();
        return snapshot.docs
            .map((doc) => AppUser.fromMap(doc.id, doc.data()))
            .toList();
      },
      mockData: mockUsersById.values.toList(),
    );
  }

  Future<AppUser?> fetchUserById(String id) async {
    return withMockFallbackFuture(
      source: () async {
        final doc = await _collection.doc(id).get();
        if (!doc.exists) return null;
        return AppUser.fromMap(doc.id, doc.data()!);
      },
      mockData: mockUsersById[id],
    );
  }

  /// Returns the local fallback AppUser for a known demo account id (e.g.
  /// 'owner_1', 'staff_alangilan'), without touching Firestore at all.
  ///
  /// This is what fetchUserById() falls back to internally when Firestore
  /// is unreachable — pulled out as its own method so it's directly unit
  /// testable without needing a Firebase/Firestore test double.
  ///
  /// Throws an ArgumentError if `id` isn't one of the known demo accounts
  /// in mockUsersById.
  AppUser buildFallbackUserForId(String id) {
    final user = mockUsersById[id];
    if (user == null) {
      throw ArgumentError('No fallback user found for id "$id"');
    }
    return user;
  }
}