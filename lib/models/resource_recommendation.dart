// AI restocking recommendation — backs the Owner > Resources screen's
// "AI Restocking Recommendations" cards (Butter/Urgent, Packaging Machine/
// Urgent, Cashew Supply/Soon, Delivery Fleet/Soon in the mockup).

enum Urgency { urgent, soon }

extension UrgencyLabel on Urgency {
  String get label => this == Urgency.urgent ? 'Urgent' : 'Soon';
}

class ResourceRecommendation {
  final String id;
  final String resourceName;
  final Urgency urgency;
  final String actionTitle; // e.g. "Restock immediately", "Schedule maintenance"
  final String detail; // e.g. "Only 2 kg left — projected to run out in 1 day..."
  final String quantityLabel; // e.g. "Order 10 kg", "1 unit offline"
  final String actionButtonLabel; // e.g. "Order Now", "Restock Now"

  const ResourceRecommendation({
    required this.id,
    required this.resourceName,
    required this.urgency,
    required this.actionTitle,
    required this.detail,
    required this.quantityLabel,
    required this.actionButtonLabel,
  });

  factory ResourceRecommendation.fromMap(String id, Map<String, dynamic> map) {
    return ResourceRecommendation(
      id: id,
      resourceName: map['resourceName'] as String? ?? '',
      urgency: (map['urgency'] as String? ?? 'soon') == 'urgent'
          ? Urgency.urgent
          : Urgency.soon,
      actionTitle: map['actionTitle'] as String? ?? '',
      detail: map['detail'] as String? ?? '',
      quantityLabel: map['quantityLabel'] as String? ?? '',
      actionButtonLabel: map['actionButtonLabel'] as String? ?? '',
    );
  }

  Map<String, dynamic> toMap() => {
        'resourceName': resourceName,
        'urgency': urgency == Urgency.urgent ? 'urgent' : 'soon',
        'actionTitle': actionTitle,
        'detail': detail,
        'quantityLabel': quantityLabel,
        'actionButtonLabel': actionButtonLabel,
      };
}