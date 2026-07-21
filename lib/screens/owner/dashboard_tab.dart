// Owner > Dashboard tab. Matches the mockup: header with logout, branch
// filter chips, Branch Performance cards, Key Metrics 2x2 grid, Revenue
// Trend chart, and Recent Orders list.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:sanserveall_mobile/models/dashboard_metrics.dart';
import '../../config/routes.dart';
import '../../config/theme.dart';
import '../../models/branch_performance.dart';
import '../../state/auth_state.dart';
import '../../state/owner_dashboard_state.dart';
import '../../utils/formatters.dart';
import '../../widgets/branch_filter_chip.dart';
import '../../widgets/metric_card.dart';
import '../../widgets/order_list_tile.dart';

class DashboardTab extends StatelessWidget {
  const DashboardTab({super.key});

  // Same cycling order as Reports tab's Branch Breakdown, so a given
  // branch shows the same color on both screens.
  Color _branchColor(int index) {
    const colors = [AppColors.branchColor1, AppColors.branchColor2, AppColors.branchColor3];
    return colors[index % colors.length];
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<OwnerDashboardState>();

    if (state.isLoading) {
      return const Center(child: CircularProgressIndicator(color: AppColors.coral));
    }

    final metrics = state.metrics!;

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        // --- Header ---
        Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    "Jorge's Casa de Sans Rival",
                    style: AppTextStyles.screenTitle.copyWith(color: AppColors.skyBlue),
                  ),
                  const SizedBox(height: 2),
                  Text('Enterprise Operations System', style: AppTextStyles.screenSubtitle),
                ],
              ),
            ),
            OutlinedButton.icon(
              onPressed: () {
                context.read<AuthState>().logout();
                Navigator.of(context).pushNamedAndRemoveUntil(
                  AppRoutes.login,
                  (route) => false,
                );
              },
              icon: const Icon(Icons.logout, size: 15),
              label: const Text('Logout'),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppColors.ink,
                side: BorderSide(color: AppColors.divider),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                minimumSize: Size.zero,
                textStyle: const TextStyle(fontSize: 12.5),
              ),
            ),
          ],
        ),
        const SizedBox(height: 18),

        // --- Branch filter chips ---
        SizedBox(
          height: 40,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              BranchFilterChip(
                label: 'All Branches',
                isSelected: state.selectedBranchId == null,
                onTap: () => state.selectBranch(null),
              ),
              for (final branch in state.branches)
                BranchFilterChip(
                  label: branch.name,
                  isSelected: state.selectedBranchId == branch.id,
                  onTap: () => state.selectBranch(branch.id),
                ),
            ],
          ),
        ),
        const SizedBox(height: 22),

        // --- Branch Performance ---
        Text('Branch Performance', style: AppTextStyles.sectionHeader),
        const SizedBox(height: 2),
        Text('Revenue · Production · Orders', style: AppTextStyles.caption),
        const SizedBox(height: 12),
        SizedBox(
          height: 140,
          child: ListView.separated(
            scrollDirection: Axis.horizontal,
            itemCount: state.visiblePerformance.length,
            separatorBuilder: (_, _) => const SizedBox(width: 12),
            itemBuilder: (context, index) => _BranchPerformanceCard(
              performance: state.visiblePerformance[index],
              dotColor: _branchColor(index),
            ),
          ),
        ),
        const SizedBox(height: 22),

        // --- Key Metrics ---
        Text('Key Metrics', style: AppTextStyles.sectionHeader),
        const SizedBox(height: 2),
        Text('This month', style: AppTextStyles.caption),
        const SizedBox(height: 12),
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.35,
          children: [
            MetricCard(
              icon: Icons.currency_exchange,
              value: formatCurrency(metrics.totalRevenue),
              label: 'This month',
              changeLabel: formatPercent(metrics.revenueChangePercent),
              changeIsPositive: metrics.revenueChangePercent >= 0,
            ),
            MetricCard(
              icon: Icons.settings_outlined,
              value: formatCompactNumber(metrics.productionOutput),
              label: 'Units this month',
              changeLabel: formatPercent(metrics.productionChangePercent),
              changeIsPositive: metrics.productionChangePercent >= 0,
            ),
            MetricCard(
              icon: Icons.show_chart,
              value: metrics.demandForecast.label,
              label: 'Next 7 days',
              changeLabel: formatPercent(metrics.demandForecastChangePercent),
              changeIsPositive: metrics.demandForecastChangePercent >= 0,
              iconBackgroundColor: AppColors.lavenderBg,
              iconColor: AppColors.skyBlue,
            ),
            MetricCard(
              icon: Icons.inventory_2_outlined,
              value: '${metrics.resourceStatusPercent}%',
              label: 'Overall sufficiency',
              iconBackgroundColor: AppColors.tanBg,
              iconColor: AppColors.stockLowFg,
              changeLabel: '${metrics.criticalResourceCount} Critical',
              changeIsPositive: false,
            ),
          ],
        ),
        const SizedBox(height: 22),

        // --- Revenue Trend ---
        Text('Revenue Trend', style: AppTextStyles.sectionHeader),
        const SizedBox(height: 2),
        Text('Last 6 months', style: AppTextStyles.caption),
        const SizedBox(height: 12),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: AppDecorations.card(),
          child: Column(
            children: [
              const _RevenueTrendChart(),
              const SizedBox(height: 14),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Total: ${formatCurrency(metrics.totalRevenue)}',
                      style: AppTextStyles.bodyBold),
                  Row(
                    children: [
                      const Icon(Icons.trending_up, size: 14, color: AppColors.stockOkFg),
                      const SizedBox(width: 3),
                      Text(
                        '${formatPercent(metrics.revenueChangePercent)} vs last month',
                        style: const TextStyle(
                          fontSize: 12,
                          fontWeight: FontWeight.w600,
                          color: AppColors.stockOkFg,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 22),

        // --- Recent Orders ---
        Text('Recent Orders', style: AppTextStyles.sectionHeader),
        const SizedBox(height: 2),
        Text(
          state.selectedBranchId == null ? 'All branches today' : 'Today',
          style: AppTextStyles.caption,
        ),
        const SizedBox(height: 12),
        for (final order in state.visibleOrders) OrderListTile(order: order),
      ],
    );
  }
}

class _BranchPerformanceCard extends StatelessWidget {
  final BranchPerformance performance;
  final Color dotColor;

  const _BranchPerformanceCard({required this.performance, required this.dotColor});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 190,
      padding: const EdgeInsets.all(14),
      decoration: AppDecorations.card(border: Border.all(color: AppColors.divider)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 10,
                height: 10,
                decoration: BoxDecoration(
                  color: dotColor,
                  shape: BoxShape.circle,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(performance.branchName,
                        style: AppTextStyles.bodyBold, overflow: TextOverflow.ellipsis),
                    Text(performance.tagline, style: AppTextStyles.caption),
                  ],
                ),
              ),
            ],
          ),
          const Spacer(),
          _statRow('Revenue', formatCurrency(performance.revenue)),
          _statRow('Production', '${formatCompactNumber(performance.productionUnits)} units'),
          _statRow('Orders', '${performance.orderCount}'),
        ],
      ),
    );
  }

  Widget _statRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(top: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: AppTextStyles.caption),
          Text(value, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppColors.ink)),
        ],
      ),
    );
  }
}

class _RevenueTrendChart extends StatelessWidget {
  const _RevenueTrendChart();

  // Relative bar heights for a 6-month trend. The mockup shows a simple
  // upward trend ending on the current month (June) highlighted in coral —
  // exact historical revenue per month isn't part of our data model, so
  // this is a stylized visual, not a literal data-driven chart.
  static const _months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  static const _heights = [0.30, 0.40, 0.35, 0.50, 0.55, 1.0];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      // Was 90, which left ~0px of margin above the tallest bar (70) +
      // label spacing (6) + label text (~14–16 depending on font scale) —
      // overflowing by a couple pixels on some devices/accessibility text
      // sizes. Bumped to 104 and the bar's max height trimmed to 64 so
      // there's real breathing room instead of an exact-fit calculation.
      height: 104,
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          for (int i = 0; i < _months.length; i++)
            Expanded(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.end,
                mainAxisSize: MainAxisSize.min,
                children: [
                  Container(
                    height: 64 * _heights[i],
                    margin: const EdgeInsets.symmetric(horizontal: 4),
                    decoration: BoxDecoration(
                      color: i == _months.length - 1
                          ? AppColors.coral
                          : AppColors.coral.withValues(alpha: 0.25),
                      borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
                    ),
                  ),
                  const SizedBox(height: 6),
                  Text(_months[i], style: AppTextStyles.caption),
                ],
              ),
            ),
        ],
      ),
    );
  }
}