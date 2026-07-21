// Firestore access for the `resource_recommendations` collection.
// Collection: resource_recommendations/{id} -> {
//   resourceName, urgency, actionTitle, detail, quantityLabel, actionButtonLabel
// }
//
// Backs the Owner > Resources screen's "AI Restocking Recommendations" cards.
// Falls back to local mock data if Firestore is unreachable.

import 'package:cloud_firestore/cloud_firestore.dart';
import '../data/mock_fallback_data.dart';
import '../models/resource_recommendation.dart';
import '../utils/stream_fallback.dart';

class ResourceRecommendationService {
  final CollectionReference<Map<String, dynamic>> _collection =
      FirebaseFirestore.instance.collection('resource_recommendations');

  Stream<List<ResourceRecommendation>> watchRecommendations() {
    return withMockFallback(
      source: _collection.snapshots().map((snapshot) => snapshot.docs
          .map((doc) => ResourceRecommendation.fromMap(doc.id, doc.data()))
          .toList()),
      mockData: mockResourceRecommendations,
    );
  }
}