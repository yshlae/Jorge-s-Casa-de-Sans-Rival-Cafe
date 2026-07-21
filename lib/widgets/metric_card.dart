// A single cell in the Owner Dashboard's 2x2 "Key Metrics" grid
// (Total Revenue, Production Output, Demand Forecast, Resource Status).

import 'package:flutter/material.dart';
import '../config/theme.dart';

class MetricCard extends StatelessWidget {
  final IconData icon;
  final String value;
  final String label;
  final String? changeLabel;
  final bool? changeIsPositive;
  final Color? iconBackgroundColor;
  final Color? iconColor;

  const MetricCard({
    super.key,
    required this.icon,
    required this.value,
    required this.label,
    this.changeLabel,
    this.changeIsPositive,
    this.iconBackgroundColor,
    this.iconColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(14),
      decoration: AppDecorations.card(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              if (iconBackgroundColor != null)
                Container(
                  width: 30,
                  height: 30,
                  decoration: BoxDecoration(
                    color: iconBackgroundColor,
                    borderRadius: BorderRadius.circular(9),
                  ),
                  child: Icon(icon, size: 16, color: iconColor ?? AppColors.ink),
                )
              else
                Icon(icon, size: 18, color: AppColors.muted),
              if (changeLabel != null)
                Row(
                  children: [
                    Icon(
                      changeIsPositive == true
                          ? Icons.arrow_upward
                          : Icons.arrow_downward,
                      size: 12,
                      color: changeIsPositive == true
                          ? AppColors.stockOkFg
                          : AppColors.stockCriticalFg,
                    ),
                    const SizedBox(width: 2),
                    Text(
                      changeLabel!,
                      style: TextStyle(
                        fontSize: 11.5,
                        fontWeight: FontWeight.w600,
                        color: changeIsPositive == true
                            ? AppColors.stockOkFg
                            : AppColors.stockCriticalFg,
                      ),
                    ),
                  ],
                ),
            ],
          ),
          const SizedBox(height: 10),
          Text(value, style: AppTextStyles.bigStat),
          const SizedBox(height: 2),
          Text(label, style: AppTextStyles.caption),
        ],
      ),
    );
  }
}