// Staff > Stock Adjustment screen. No mockup exists for this — reuses the
// same interaction pattern as the Owner's "+ New" adjustment sheet
// (item picker, Restock/Deduction toggle, +/- stepper), but as a full
// screen scoped only to items at the staff member's own branch, and with
// "Logged by" auto-filled (not editable) since it's their own account.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/theme.dart';
import '../../models/inventory_item.dart';
import '../../models/stock_adjustment_log.dart';
import '../../state/auth_state.dart';
import '../../state/staff_state.dart';

class StockAdjustmentScreen extends StatefulWidget {
  const StockAdjustmentScreen({super.key});

  @override
  State<StockAdjustmentScreen> createState() => _StockAdjustmentScreenState();
}

class _StockAdjustmentScreenState extends State<StockAdjustmentScreen> {
  String? _selectedItemId;
  AdjustmentType _type = AdjustmentType.restock;
  int _amount = 1;

  /// Resolves the live InventoryItem for the selected id from whatever
  /// list is current right now. Never cache the InventoryItem object
  /// itself in state — every Firestore snapshot rebuilds `items` with
  /// brand-new instances, and InventoryItem has no value-based `==`, so a
  /// stale cached object stops matching anything in the new list (this is
  /// exactly what caused the DropdownButtonFormField assertion crash).
  InventoryItem? _resolveSelected(List<InventoryItem> items) {
    for (final item in items) {
      if (item.id == _selectedItemId) return item;
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    final state = context.watch<StaffState>();
    final currentUser = context.watch<AuthState>().currentUser;
    final items = state.items;
    final selectedItem = _resolveSelected(items);

    if (state.isLoading) {
      return const Center(child: CircularProgressIndicator(color: AppColors.coral));
    }

    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 16, 20, 24),
      children: [
        Text('Adjust Stock', style: AppTextStyles.screenTitle),
        const SizedBox(height: 2),
        Text('${state.branchName ?? ''} Branch', style: AppTextStyles.screenSubtitle),
        const SizedBox(height: 20),

        Text('Item', style: AppTextStyles.bodyBold),
        const SizedBox(height: 6),
        DropdownButtonFormField<String>(
          // Keying by id (a stable string) instead of the whole
          // InventoryItem object is what actually fixes the crash — ids
          // don't change across snapshot rebuilds even though the object
          // instances do.
          initialValue: _selectedItemId,
          isExpanded: true,
          decoration: _fieldDecoration(),
          hint: const Text('Select an item'),
          items: items
              .map((item) => DropdownMenuItem(
                    value: item.id,
                    child: Text('${item.name} (${item.currentStock} ${item.unit})'),
                  ))
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
                onTap: () => setState(() => _type = AdjustmentType.deduction),
              ),
            ),
          ],
        ),
        const SizedBox(height: 16),

        Text('Amount', style: AppTextStyles.bodyBold),
        const SizedBox(height: 6),
        Container(
          decoration: AppDecorations.card(radius: 12),
          child: Row(
            children: [
              _StepButton(
                icon: Icons.remove,
                onTap: () => setState(() => _amount = _amount > 1 ? _amount - 1 : 1),
              ),
              Expanded(
                child: Center(
                  child: Text('$_amount', style: AppTextStyles.bigStat.copyWith(fontSize: 20)),
                ),
              ),
              _StepButton(
                icon: Icons.add,
                onTap: () => setState(() => _amount += 1),
              ),
            ],
          ),
        ),
        const SizedBox(height: 16),

        Text('Logged by', style: AppTextStyles.bodyBold),
        const SizedBox(height: 6),
        Container(
          width: double.infinity,
          padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 14),
          decoration: AppDecorations.card(radius: 12),
          child: Text(currentUser?.name ?? 'Staff', style: AppTextStyles.body),
        ),

        if (state.errorMessage != null) ...[
          const SizedBox(height: 12),
          Text(
            state.errorMessage!,
            style: const TextStyle(color: AppColors.stockCriticalFg, fontSize: 12.5),
          ),
        ],

        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: state.isSaving || selectedItem == null
              ? null
              : () async {
                  final itemBeingAdjusted = selectedItem;
                  final success = await state.submitAdjustment(
                    item: itemBeingAdjusted,
                    type: _type,
                    amount: _amount,
                    staffName: currentUser?.name ?? 'Staff',
                  );
                  if (success && context.mounted) {
                    setState(() {
                      _selectedItemId = null;
                      _amount = 1;
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text('Saved: ${itemBeingAdjusted.name} adjustment logged.'),
                        duration: const Duration(seconds: 2),
                      ),
                    );
                  }
                },
          child: state.isSaving
              ? const SizedBox(
                  width: 20,
                  height: 20,
                  child: CircularProgressIndicator(strokeWidth: 2, color: AppColors.white),
                )
              : const Text('Save Adjustment'),
        ),
      ],
    );
  }

  InputDecoration _fieldDecoration() {
    return InputDecoration(
      filled: true,
      fillColor: AppColors.cardBackground,
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

  const _TypeButton({required this.label, required this.isSelected, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.coral : AppColors.cardBackground,
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
        width: 48,
        height: 48,
        alignment: Alignment.center,
        child: Icon(icon, color: AppColors.ink),
      ),
    );
  }
}