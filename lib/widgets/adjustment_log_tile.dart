// A single row in the Inventory > Adjustments tab's "Recent Stock
// Adjustments" list.

import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/stock_adjustment_log.dart';
import '../utils/formatters.dart';

class AdjustmentLogTile extends StatelessWidget {
  final StockAdjustmentLog log;

  const AdjustmentLogTile({super.key, required this.log});

  bool get _isRestock => log.type == AdjustmentType.restock;

  @override
  Widget build(BuildContext context) {
    final tagBg = _isRestock ? AppColors.stockOkBg : AppColors.stockCriticalBg;
    final tagFg = _isRestock ? AppColors.stockOkFg : AppColors.stockCriticalFg;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: AppDecorations.card(),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(log.itemName, style: AppTextStyles.bodyBold),
                const SizedBox(height: 6),
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                      decoration: BoxDecoration(
                        color: tagBg,
                        borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
                      ),
                      child: Text(
                        log.type.label,
                        style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.w600, color: tagFg),
                      ),
                    ),
                    const SizedBox(width: 6),
                    Text(log.branchName, style: AppTextStyles.caption),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  'by ${log.staffName} · ${formatDateTime(log.timestamp)}',
                  style: AppTextStyles.caption,
                ),
              ],
            ),
          ),
          Text(
            log.signedLabel,
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: _isRestock ? AppColors.stockOkFg : AppColors.stockCriticalFg,
            ),
          ),
        ],
      ),
    );
  }
}