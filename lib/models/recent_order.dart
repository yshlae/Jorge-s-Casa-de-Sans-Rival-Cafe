// Recent order model — backs the "Recent Orders" list at the bottom of the
// Owner Dashboard (order #, branch, item summary, amount, status badge).

enum OrderStatus { delivered, preparing, pending }

extension OrderStatusLabel on OrderStatus {
  String get label {
    switch (this) {
      case OrderStatus.delivered:
        return 'Delivered';
      case OrderStatus.preparing:
        return 'Preparing';
      case OrderStatus.pending:
        return 'Pending';
    }
  }
}

class RecentOrder {
  final String id;
  final String orderNumber; // e.g. "#2041"
  final String branchName;
  final String itemSummary; // e.g. "Classic Sans Rival x2"
  final double amount;
  final OrderStatus status;

  const RecentOrder({
    required this.id,
    required this.orderNumber,
    required this.branchName,
    required this.itemSummary,
    required this.amount,
    required this.status,
  });

  static OrderStatus _statusFromString(String? value) {
    switch (value) {
      case 'delivered':
        return OrderStatus.delivered;
      case 'preparing':
        return OrderStatus.preparing;
      default:
        return OrderStatus.pending;
    }
  }

  factory RecentOrder.fromMap(String id, Map<String, dynamic> map) {
    return RecentOrder(
      id: id,
      orderNumber: map['orderNumber'] as String? ?? '',
      branchName: map['branchName'] as String? ?? '',
      itemSummary: map['itemSummary'] as String? ?? '',
      amount: (map['amount'] as num?)?.toDouble() ?? 0,
      status: _statusFromString(map['status'] as String?),
    );
  }

  Map<String, dynamic> toMap() => {
        'orderNumber': orderNumber,
        'branchName': branchName,
        'itemSummary': itemSummary,
        'amount': amount,
        'status': status.name,
      };
}