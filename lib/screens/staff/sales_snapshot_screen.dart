// Staff > Sales Snapshot screen. No mockup exists for this — a simple,
// read-only view of today's revenue, transaction count, and top product
// for the staff member's own branch.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../models/sales_summary.dart';
import '../../state/staff_state.dart';
import '../../utils/formatters.dart';

class SalesSnapshotScreen extends StatelessWidget {
  const SalesSnapshotScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<StaffState>();

    if (state.isLoading) {
      return const Center(child: CircularProgressIndicator(color: AppColors.coral));
    }

    final sales = state.todaysSales;

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text("Today's Sales", style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text('${state.branchName ?? ''} Branch', style: AppTextStyles.screenSubtitle),
        const SizedBox(height: 18),

        if (sales == null)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: AppDecorations.card(),
            child: Column(
              children: [
                const Icon(Icons.receipt_long_outlined, size: 32, color: AppColors.muted),
                const SizedBox(height: 10),
                Text(
                  'No sales recorded yet for today.',
                  style: AppTextStyles.body,
                  textAlign: TextAlign.center,
                ),
              ],
            ),
          )
        else ...[
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: AppDecorations.card(),
            child: Column(
              children: [
                Text(
                  formatCurrency(sales.revenue),
                  style: AppTextStyles.bigStat.copyWith(fontSize: 26),
                ),
                const SizedBox(height: 4),
                Text('Revenue — ${state.branchName ?? ''} Branch', style: AppTextStyles.caption),
                const SizedBox(height: 8),
                _ChangeIndicator(percent: sales.revenueChangePercent),
              ],
            ),
          ),
          const SizedBox(height: 18),
          Text('${sales.transactionCount} transactions today', style: AppTextStyles.bodyBold),
          const SizedBox(height: 14),
          const Divider(),
          const SizedBox(height: 14),

          if (sales.hourlyBreakdown.isNotEmpty) ...[
            Text('Hourly Breakdown', style: AppTextStyles.sectionHeader.copyWith(fontSize: 15)),
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(16),
              decoration: AppDecorations.card(),
              child: _HourlyBreakdownChart(hours: sales.hourlyBreakdown),
            ),
            const SizedBox(height: 18),
          ],

          Text('Top Items Today', style: AppTextStyles.caption),
          const SizedBox(height: 8),
          if (sales.topProducts.isNotEmpty)
            for (int i = 0; i < sales.topProducts.length; i++)
              _TopProductRow(rank: i + 1, product: sales.topProducts[i])
          else
            Text('No top item recorded yet.', style: AppTextStyles.body),
        ],
      ],
    );
  }
}

class _ChangeIndicator extends StatelessWidget {
  final double percent;
  const _ChangeIndicator({required this.percent});

  @override
  Widget build(BuildContext context) {
    final isPositive = percent >= 0;
    final color = isPositive ? AppColors.stockOkFg : AppColors.stockCriticalFg;
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(isPositive ? Icons.trending_up : Icons.trending_down, size: 14, color: color),
        const SizedBox(width: 3),
        Text(
          '${formatPercent(percent)} vs yesterday',
          style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: color),
        ),
      ],
    );
  }
}

class _TopProductRow extends StatelessWidget {
  final int rank;
  final TopProduct product;
  const _TopProductRow({required this.rank, required this.product});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Container(
            width: 22,
            height: 22,
            alignment: Alignment.center,
            decoration: BoxDecoration(
              color: rank == 1 ? AppColors.coral.withValues(alpha: 0.15) : AppColors.divider,
              shape: BoxShape.circle,
            ),
            child: Text(
              '$rank',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w700,
                color: rank == 1 ? AppColors.coral : AppColors.muted,
              ),
            ),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Text(
              product.name,
              style: rank == 1
                  ? AppTextStyles.bodyBold.copyWith(color: AppColors.coral)
                  : AppTextStyles.body,
              overflow: TextOverflow.ellipsis,
            ),
          ),
          Text(
            formatCurrency(product.amount),
            style: rank == 1
                ? AppTextStyles.bodyBold.copyWith(color: AppColors.coral)
                : AppTextStyles.bodyBold,
          ),
        ],
      ),
    );
  }
}

/// Small bar chart for the day's hourly revenue slices — same "stylized
/// bars with labels" visual language as DashboardTab's Revenue Trend chart
/// and ReportsTab's trend cards, just driven by real per-hour data here
/// instead of stylized relative heights.
class _HourlyBreakdownChart extends StatelessWidget {
  final List<HourlySales> hours;
  const _HourlyBreakdownChart({required this.hours});

  @override
  Widget build(BuildContext context) {
    final maxRevenue = hours.map((h) => h.revenue).reduce((a, b) => a > b ? a : b);
    return SizedBox(
      height: 104,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          for (int i = 0; i < hours.length; i++)
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    height: maxRevenue == 0 ? 0 : 64 * (hours[i].revenue / maxRevenue),
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    decoration: BoxDecoration(
                      color: i == hours.length - 1
                          ? AppColors.coral
                          : AppColors.coral.withValues(alpha: 0.25),
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(hours[i].label, style: AppTextStyles.caption.copyWith(fontSize: 10)),
                ],
              ),
            ),
        ],
      ),
    );
  }
}