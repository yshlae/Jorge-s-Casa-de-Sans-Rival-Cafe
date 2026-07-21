// Owner > Reports tab. Matches the mockup: Monthly/Weekly toggle, Total
// Revenue / Total Orders trend cards, Branch Breakdown bars, and Export
// Reports options.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../models/report_summary.dart';
import '../../state/reports_state.dart';
import '../../utils/formatters.dart';
import '../../widgets/branch_breakdown_bar.dart';
import '../../widgets/branch_filter_chip.dart';
import '../../widgets/export_option_tile.dart';

class ReportsTab extends StatelessWidget {
  const ReportsTab({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<ReportsState>();

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text('Reports & Export', style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text('Financial and operational summary', style: AppTextStyles.screenSubtitle),
        const SizedBox(height: 16),

        // --- Monthly / Weekly toggle ---
        Row(
          children: [
            BranchFilterChip(
              label: 'Monthly',
              isSelected: state.selectedPeriod == ReportPeriod.monthly,
              onTap: () => state.selectPeriod(ReportPeriod.monthly),
            ),
            BranchFilterChip(
              label: 'Weekly',
              isSelected: state.selectedPeriod == ReportPeriod.weekly,
              onTap: () => state.selectPeriod(ReportPeriod.weekly),
            ),
          ],
        ),
        const SizedBox(height: 18),

        if (state.isLoading)
          const Padding(
            padding: EdgeInsets.symmetric(vertical: 40),
            child: Center(child: CircularProgressIndicator(color: AppColors.coral)),
          )
        else ...[
          _TrendCard(
            label: 'Total Revenue',
            value: formatCurrency(state.summary!.totalRevenue),
            changePercent: state.summary!.revenueChangePercent,
            barColor: AppColors.coral,
          ),
          const SizedBox(height: 14),
          _TrendCard(
            label: 'Total Orders',
            value: '${state.summary!.totalOrders}',
            changePercent: state.summary!.orderChangePercent,
            barColor: AppColors.skyBlue,
          ),
          const SizedBox(height: 22),

          Text('Branch Breakdown', style: AppTextStyles.sectionHeader),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(16),
            decoration: AppDecorations.card(),
            child: Column(
              children: [
                for (int i = 0; i < state.summary!.branchBreakdown.length; i++)
                  BranchBreakdownBar(
                    entry: state.summary!.branchBreakdown[i],
                    color: _branchColor(i),
                  ),
              ],
            ),
          ),
          const SizedBox(height: 22),

          Text('Export Reports', style: AppTextStyles.sectionHeader),
          const SizedBox(height: 12),
          ExportOptionTile(
            icon: Icons.picture_as_pdf_outlined,
            label: 'Export as PDF',
            onTap: () => _showExportSnack(context, 'PDF'),
          ),
          ExportOptionTile(
            icon: Icons.table_chart_outlined,
            label: 'Export as CSV',
            onTap: () => _showExportSnack(context, 'CSV'),
          ),
          ExportOptionTile(
            icon: Icons.email_outlined,
            label: 'Share via Email',
            onTap: () => _showExportSnack(context, 'Email'),
          ),
        ],
      ],
    );
  }

  Color _branchColor(int index) {
    const colors = [AppColors.branchColor1, AppColors.branchColor2, AppColors.branchColor3];
    return colors[index % colors.length];
  }

  void _showExportSnack(BuildContext context, String format) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('Preparing $format export...'),
        duration: const Duration(seconds: 2),
      ),
    );
  }
}

class _TrendCard extends StatelessWidget {
  final String label;
  final String value;
  final double changePercent;
  final Color barColor;

  const _TrendCard({
    required this.label,
    required this.value,
    required this.changePercent,
    required this.barColor,
  });

  // Same "stylized, not literally data-driven" approach as the Dashboard's
  // Revenue Trend chart — six relative bar heights ending on the current
  // period, since we only store one summary value, not full history.
  static const _heights = [0.30, 0.40, 0.35, 0.50, 0.55, 1.0];
  static const _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

  @override
  Widget build(BuildContext context) {
    final isPositive = changePercent >= 0;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: AppDecorations.card(),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(label, style: AppTextStyles.caption),
              Row(
                children: [
                  Icon(
                    isPositive ? Icons.trending_up : Icons.trending_down,
                    size: 14,
                    color: isPositive ? AppColors.stockOkFg : AppColors.stockCriticalFg,
                  ),
                  const SizedBox(width: 3),
                  Text(
                    formatPercent(changePercent),
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: isPositive ? AppColors.stockOkFg : AppColors.stockCriticalFg,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(height: 4),
          Text(value, style: AppTextStyles.bigStat),
          const SizedBox(height: 14),
          SizedBox(
            height: 46,
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.end,
              children: [
                for (int i = 0; i < _months.length; i++)
                  Expanded(
                    child: Container(
                      height: 40 * _heights[i],
                      margin: const EdgeInsets.symmetric(horizontal: 3),
                      decoration: BoxDecoration(
                        color: i == _months.length - 1
                            ? barColor
                            : barColor.withValues(alpha: 0.25),
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(3)),
                      ),
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}