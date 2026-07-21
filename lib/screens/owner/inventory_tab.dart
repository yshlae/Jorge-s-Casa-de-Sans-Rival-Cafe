// Owner > Inventory tab. Matches the mockup: stat chips (In Stock / Low
// Stock / Critical), All Categories / Products / Raw Materials /
// Adjustments sub-tabs, item cards with progress bars, and a working
// "+ New" adjustment form on the Adjustments sub-tab.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../models/inventory_item.dart';
import '../../models/stock_adjustment_log.dart';
import '../../state/auth_state.dart';
import '../../state/inventory_state.dart' as inventory_state;
import '../../widgets/adjustment_log_tile.dart';
import '../../widgets/branch_filter_chip.dart';
import '../../widgets/stat_chip.dart';
import '../../widgets/stock_item_card.dart';

class InventoryTab extends StatelessWidget {
  const InventoryTab({super.key});

  @override
  Widget build(BuildContext context) {
    final state = context.watch<inventory_state.InventoryState>();

    if (state.isLoading) {
      return const Center(
        child: CircularProgressIndicator(color: AppColors.coral),
      );
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text('Inventory', style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text(
          'Stock levels across all branches',
          style: AppTextStyles.screenSubtitle,
        ),
        const SizedBox(height: 16),

        // --- Stat chips ---
        Row(
          children: [
            StatChip(
              count: state.inStockCount,
              label: 'In Stock',
              background: AppColors.stockOkBg,
              foreground: AppColors.stockOkFg,
            ),
            const SizedBox(width: 10),
            StatChip(
              count: state.lowStockCount,
              label: 'Low Stock',
              background: AppColors.stockLowBg,
              foreground: AppColors.stockLowFg,
            ),
            const SizedBox(width: 10),
            StatChip(
              count: state.criticalCount,
              label: 'Critical',
              background: AppColors.stockCriticalBg,
              foreground: AppColors.stockCriticalFg,
            ),
          ],
        ),
        const SizedBox(height: 16),

        // --- Category sub-tabs ---
        SizedBox(
          height: 40,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              BranchFilterChip(
                label: 'All Categories',
                isSelected:
                    state.selectedTab == inventory_state.InventoryTab.all,
                onTap: () => state.selectTab(inventory_state.InventoryTab.all),
              ),
              BranchFilterChip(
                label: 'Products',
                isSelected:
                    state.selectedTab == inventory_state.InventoryTab.products,
                onTap: () =>
                    state.selectTab(inventory_state.InventoryTab.products),
              ),
              BranchFilterChip(
                label: 'Raw Materials',
                isSelected:
                    state.selectedTab ==
                    inventory_state.InventoryTab.rawMaterials,
                onTap: () =>
                    state.selectTab(inventory_state.InventoryTab.rawMaterials),
              ),
              BranchFilterChip(
                label: 'Adjustments',
                isSelected:
                    state.selectedTab ==
                    inventory_state.InventoryTab.adjustments,
                onTap: () =>
                    state.selectTab(inventory_state.InventoryTab.adjustments),
              ),
            ],
          ),
        ),
        const SizedBox(height: 18),

        // --- Content ---
        if (state.selectedTab == inventory_state.InventoryTab.adjustments) ...[
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Recent Stock Adjustments',
                style: AppTextStyles.sectionHeader,
              ),
              ElevatedButton.icon(
                onPressed: () => _showNewAdjustmentSheet(context),
                icon: const Icon(Icons.add, size: 16),
                label: const Text('New'),
                style: ElevatedButton.styleFrom(
                  minimumSize: Size.zero,
                  padding: const EdgeInsets.symmetric(
                    horizontal: 14,
                    vertical: 10,
                  ),
                  textStyle: const TextStyle(fontSize: 13),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          for (final log in state.adjustmentLogs) AdjustmentLogTile(log: log),
        ] else ...[
          for (final item in state.visibleItems)
            StockItemCard(
              item: item,
              onDelete: (item) async {
                final success = await state.deleteItem(item);
                if (!success && context.mounted) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: Text(state.errorMessage ?? 'Failed to delete item.'),
                      duration: const Duration(seconds: 2),
                    ),
                  );
                }
                return success;
              },
            ),
        ],
      ],
    );
  }

  void _showNewAdjustmentSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (sheetContext) {
        return ChangeNotifierProvider.value(
          value: context.read<inventory_state.InventoryState>(),
          child: const _NewAdjustmentSheet(),
        );
      },
    );
  }
}

class _NewAdjustmentSheet extends StatefulWidget {
  const _NewAdjustmentSheet();

  @override
  State<_NewAdjustmentSheet> createState() => _NewAdjustmentSheetState();
}

class _NewAdjustmentSheetState extends State<_NewAdjustmentSheet> {
  String? _selectedItemId;
  AdjustmentType _type = AdjustmentType.restock;
  int _amount = 1;
  late final TextEditingController _staffController;

  /// See stock_adjustment_screen.dart's identical helper for why this
  /// exists: caching the InventoryItem object itself (instead of its
  /// stable id) breaks the moment inventory_state's Firestore listener
  /// rebuilds the item list with new instances, since InventoryItem has
  /// no value-based `==`.
  InventoryItem? _resolveSelected(List<InventoryItem> items) {
    for (final item in items) {
      if (item.id == _selectedItemId) return item;
    }
    return null;
  }

  @override
  void initState() {
    super.initState();
    final currentUser = context.read<AuthState>().currentUser;
    _staffController = TextEditingController(
      text: currentUser?.name ?? 'Admin',
    );
  }

  @override
  void dispose() {
    _staffController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<inventory_state.InventoryState>();
    final items = state.allItems;
    final selectedItem = _resolveSelected(items);

    return Padding(
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: Container(
        padding: const EdgeInsets.fromLTRB(20, 20, 20, 28),
        decoration: const BoxDecoration(
          color: AppColors.cardBackgroundAlt,
          borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Center(
              child: Container(
                width: 40,
                height: 4,
                margin: const EdgeInsets.only(bottom: 16),
                decoration: BoxDecoration(
                  color: AppColors.divider,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
            ),
            Text('New Stock Adjustment', style: AppTextStyles.sectionHeader),
            const SizedBox(height: 16),

            Text('Item', style: AppTextStyles.bodyBold),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              initialValue: _selectedItemId,
              isExpanded: true,
              decoration: _fieldDecoration(),
              hint: const Text('Select an item'),
              items: items
                  .map(
                    (item) => DropdownMenuItem(
                      value: item.id,
                      child: Text(
                        '${item.name} (${item.currentStock} ${item.unit})',
                      ),
                    ),
                  )
                  .toList(),
              onChanged: (value) => setState(() => _selectedItemId = value),
            ),
            const SizedBox(height: 16),

            Text('Type', style: AppTextStyles.bodyBold),
            const SizedBox(height: 6),
            Row(
              children: [
                Expanded(
                  child: _TypeButton(
                    label: 'Restock',
                    isSelected: _type == AdjustmentType.restock,
                    onTap: () => setState(() => _type = AdjustmentType.restock),
                  ),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: _TypeButton(
                    label: 'Deduction',
                    isSelected: _type == AdjustmentType.deduction,
                    onTap: () =>
                        setState(() => _type = AdjustmentType.deduction),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Text('Amount', style: AppTextStyles.bodyBold),
            const SizedBox(height: 6),
            Row(
              children: [
                _StepButton(
                  icon: Icons.remove,
                  onTap: () =>
                      setState(() => _amount = _amount > 1 ? _amount - 1 : 1),
                ),
                Expanded(
                  child: Center(
                    child: Text(
                      '$_amount',
                      style: AppTextStyles.bigStat.copyWith(fontSize: 20),
                    ),
                  ),
                ),
                _StepButton(
                  icon: Icons.add,
                  onTap: () => setState(() => _amount += 1),
                ),
              ],
            ),
            const SizedBox(height: 16),

            Text('Logged by', style: AppTextStyles.bodyBold),
            const SizedBox(height: 6),
            TextField(
              controller: _staffController,
              decoration: _fieldDecoration(),
            ),

            if (state.errorMessage != null) ...[
              const SizedBox(height: 12),
              Text(
                state.errorMessage!,
                style: const TextStyle(
                  color: AppColors.stockCriticalFg,
                  fontSize: 12.5,
                ),
              ),
            ],

            const SizedBox(height: 20),
            ElevatedButton(
              onPressed: state.isSaving || selectedItem == null
                  ? null
                  : () async {
                      final success = await state.submitAdjustment(
                        item: selectedItem,
                        type: _type,
                        amount: _amount,
                        staffName: _staffController.text.trim().isEmpty
                            ? 'Admin'
                            : _staffController.text.trim(),
                      );
                      if (success && context.mounted) {
                        Navigator.of(context).pop();
                      }
                    },
              child: state.isSaving
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(
                        strokeWidth: 2,
                        color: AppColors.white,
                      ),
                    )
                  : const Text('Save Adjustment'),
            ),
          ],
        ),
      ),
    );
  }

  InputDecoration _fieldDecoration() {
    return InputDecoration(
      filled: true,
      fillColor: AppColors.background,
      contentPadding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(12),
        borderSide: BorderSide.none,
      ),
    );
  }
}

class _TypeButton extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const _TypeButton({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.coral : AppColors.background,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Text(
          label,
          textAlign: TextAlign.center,
          style: TextStyle(
            fontWeight: FontWeight.w600,
            color: isSelected ? AppColors.white : AppColors.ink,
          ),
        ),
      ),
    );
  }
}

class _StepButton extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;

  const _StepButton({required this.icon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(12),
        ),
        child: Icon(icon, color: AppColors.ink),
      ),
    );
  }
}