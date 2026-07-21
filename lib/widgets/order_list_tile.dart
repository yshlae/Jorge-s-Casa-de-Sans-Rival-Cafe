// A single row in the Owner Dashboard's "Recent Orders" list.

import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/recent_order.dart';
import '../utils/formatters.dart';

class OrderListTile extends StatelessWidget {
  final RecentOrder order;

  const OrderListTile({super.key, required this.order});

  Color get _badgeBg {
    switch (order.status) {
      case OrderStatus.delivered:
        return AppColors.statusDeliveredBg;
      case OrderStatus.preparing:
        return AppColors.statusPreparingBg;
      case OrderStatus.pending:
        return AppColors.statusPendingBg;
    }
  }

  Color get _badgeFg {
    switch (order.status) {
      case OrderStatus.delivered:
        return AppColors.statusDeliveredFg;
      case OrderStatus.preparing:
        return AppColors.statusPreparingFg;
      case OrderStatus.pending:
        return AppColors.statusPendingFg;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(bottom: 10),
      padding: const EdgeInsets.all(14),
      decoration: AppDecorations.card(),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '${order.orderNumber} · ${order.branchName}',
                  style: AppTextStyles.bodyBold,
                ),
                const SizedBox(height: 3),
                Text(order.itemSummary, style: AppTextStyles.caption),
              ],
            ),
          ),
          const SizedBox(width: 8),
          Column(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: [
              Text(
                formatCurrency(order.amount),
                style: const TextStyle(
                  fontWeight: FontWeight.bold,
                  color: AppColors.coral,
                  fontSize: 14,
                ),
              ),
              const SizedBox(height: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: _badgeBg,
                  borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
                ),
                child: Text(
                  order.status.label,
                  style: TextStyle(
                    fontSize: 11,
                    fontWeight: FontWeight.w600,
                    color: _badgeFg,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}