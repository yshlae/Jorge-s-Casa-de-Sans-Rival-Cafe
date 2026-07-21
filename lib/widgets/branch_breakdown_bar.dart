// A single branch's row on the Owner > Reports tab's "Branch Breakdown"
// card — branch name, amount + percent, and a colored proportion bar.

import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/report_summary.dart';
import '../utils/formatters.dart';

class BranchBreakdownBar extends StatelessWidget {
  final BranchBreakdownEntry entry;
  final Color color;

  const BranchBreakdownBar({super.key, required this.entry, required this.color});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 14),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(entry.branchName, style: AppTextStyles.bodyBold),
              Text(
                '${formatCurrency(entry.amount)} · ${entry.percent.toStringAsFixed(0)}%',
                style: AppTextStyles.caption,
              ),
            ],
          ),
          const SizedBox(height: 6),
          ClipRRect(
            borderRadius: BorderRadius.circular(6),
            child: LinearProgressIndicator(
              value: (entry.percent / 100).clamp(0.0, 1.0),
              minHeight: 8,
              backgroundColor: AppColors.divider,
              color: color,
            ),
          ),
        ],
      ),
    );
  }
}