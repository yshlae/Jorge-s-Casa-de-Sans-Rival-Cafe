// An "AI Restocking Recommendation" card on the Owner > Resources tab
// (e.g. Butter/Urgent, Packaging Machine/Urgent, Cashew Supply/Soon,
// Delivery Fleet/Soon in the mockup).

import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/resource_recommendation.dart';

class RecommendationCard extends StatelessWidget {
  final ResourceRecommendation recommendation;
  final VoidCallback? onActionPressed;

  const RecommendationCard({
    super.key,
    required this.recommendation,
    this.onActionPressed,
  });

  bool get _isUrgent => recommendation.urgency == Urgency.urgent;

  IconData get _icon {
    final name = recommendation.resourceName.toLowerCase();
    if (name.contains('fleet') || name.contains('vehicle')) return Icons.local_shipping_outlined;
    if (name.contains('machine')) return Icons.precision_manufacturing_outlined;
    if (name.contains('supply') || name.contains('cashew')) return Icons.shopping_basket_outlined;
    return Icons.inventory_2_outlined;
  }

  @override
  Widget build(BuildContext context) {
    final urgencyBg = _isUrgent ? AppColors.urgentBg : AppColors.soonBg;
    final urgencyFg = _isUrgent ? AppColors.urgentFg : AppColors.soonFg;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: AppDecorations.card(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: 36,
                height: 36,
                decoration: BoxDecoration(
                  color: urgencyBg,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(_icon, size: 18, color: urgencyFg),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: Text(recommendation.resourceName, style: AppTextStyles.bodyBold),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: urgencyBg,
                  borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
                ),
                child: Text(
                  recommendation.urgency.label,
                  style: TextStyle(fontSize: 11, fontWeight: FontWeight.w600, color: urgencyFg),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          Text(
            recommendation.actionTitle,
            style: TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: urgencyFg),
          ),
          const SizedBox(height: 4),
          Text(recommendation.detail, style: AppTextStyles.caption),
          const SizedBox(height: 12),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Text(
                  recommendation.quantityLabel,
                  style: const TextStyle(
                    fontSize: 12.5,
                    fontWeight: FontWeight.w600,
                    color: AppColors.stockOkFg,
                  ),
                ),
              ),
              ElevatedButton(
                onPressed: onActionPressed,
                style: ElevatedButton.styleFrom(
                  minimumSize: Size.zero,
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  textStyle: const TextStyle(fontSize: 12.5),
                ),
                child: Text(recommendation.actionButtonLabel),
              ),
            ],
          ),
        ],
      ),
    );
  }
}