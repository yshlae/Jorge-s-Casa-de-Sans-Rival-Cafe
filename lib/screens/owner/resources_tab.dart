// Owner > Resources tab. Matches the mockup: header, "Overall Utilization"
// donut with a critical-count callout, and the "AI Restocking
// Recommendations" card list.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../state/resources_state.dart';
import '../../widgets/recommendation_card.dart';
import '../../widgets/utilization_donut.dart';

class ResourcesTab extends StatelessWidget {
  const ResourcesTab({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<ResourcesState>();

    if (state.isLoading) {
      return const Center(child: CircularProgressIndicator(color: AppColors.coral));
    }

    final percent = state.overallUtilizationPercent ?? 0;
    final criticalCount = state.criticalResourceCount ?? 0;

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text('Resource Management', style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text('Staff · Equipment · Supplies', style: AppTextStyles.screenSubtitle),
        const SizedBox(height: 18),

        // --- Overall Utilization card ---
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppDecorations.card(),
          child: Row(
            children: [
              UtilizationDonut(percent: percent),
              const SizedBox(width: 16),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Overall Utilization', style: AppTextStyles.bodyBold),
                    const SizedBox(height: 4),
                    Text(
                      '$criticalCount resources need attention',
                      style: AppTextStyles.caption,
                    ),
                    const SizedBox(height: 6),
                    Row(
                      children: [
                        const Icon(Icons.warning_amber_rounded,
                            size: 14, color: AppColors.stockCriticalFg),
                        const SizedBox(width: 4),
                        Text(
                          '$criticalCount Critical',
                          style: const TextStyle(
                            fontSize: 12.5,
                            fontWeight: FontWeight.w600,
                            color: AppColors.stockCriticalFg,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 22),

        // --- AI Restocking Recommendations ---
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              width: 32,
              height: 32,
              decoration: BoxDecoration(
                color: AppColors.gold,
                borderRadius: BorderRadius.circular(8),
              ),
              child: const Icon(Icons.auto_awesome, size: 16, color: AppColors.ink),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('AI Restocking Recommendations', style: AppTextStyles.sectionHeader),
                  Text('Based on usage trends · Updated just now', style: AppTextStyles.caption),
                ],
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        for (final rec in state.recommendations)
          RecommendationCard(
            recommendation: rec,
            onActionPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text('${rec.actionButtonLabel}: ${rec.resourceName} — noted.'),
                  duration: const Duration(seconds: 2),
                ),
              );
            },
          ),
      ],
    );
  }
}