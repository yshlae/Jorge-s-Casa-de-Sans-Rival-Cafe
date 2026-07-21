// Staff > Shift & Stock Check screen. No mockup exists for this — styled
// to match the Owner side's visual language (same theme tokens, same
// StockItemCard used on the Owner's Inventory tab).
//
// Flow: staff taps "Start Shift", then sees a quick glance at their
// branch's current stock levels using the same item cards from Inventory.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../state/staff_state.dart';
import '../../widgets/stock_item_card.dart';

class ShiftStockCheckScreen extends StatelessWidget {
  const ShiftStockCheckScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<StaffState>();

    if (state.isLoading) {
      return const Center(child: CircularProgressIndicator(color: AppColors.coral));
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text('Shift', style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text('${state.branchName ?? ''} Branch', style: AppTextStyles.screenSubtitle),
        const SizedBox(height: 16),

        if (!state.shiftStarted)
          ElevatedButton(
            onPressed: () => state.startShift(),
            child: Text('Start Shift — ${state.branchName ?? ''}'),
          )
        else
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: AppColors.stockOkBg,
              borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
            ),
            child: Row(
              children: [
                const Icon(Icons.check_circle, color: AppColors.stockOkFg, size: 20),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    'Shift started — you\'re clocked in for ${state.branchName ?? 'this branch'}.',
                    style: const TextStyle(
                      color: AppColors.stockOkFg,
                      fontWeight: FontWeight.w600,
                      fontSize: 13,
                    ),
                  ),
                ),
              ],
            ),
          ),

        const SizedBox(height: 22),
        Text('Current Stock', style: AppTextStyles.sectionHeader),
        const SizedBox(height: 2),
        Text('${state.items.length} items tracked at this branch', style: AppTextStyles.caption),
        const SizedBox(height: 12),
        for (final item in state.items) StockItemCard(item: item),
      ],
    );
  }
}