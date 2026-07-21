// An inventory item card — name, category, status badge, progress bar,
// current stock, and reorder threshold. Used in the Inventory tab's
// Products and Raw Materials sub-tabs.

import 'package:flutter/material.dart';
import '../config/theme.dart';
import '../models/inventory_item.dart';

class StockItemCard extends StatelessWidget {
  final InventoryItem item;
  final VoidCallback? onTap;
  /// If provided, enables swipe-to-delete (with a confirmation dialog
  /// first) via a Dismissible. Omit to keep the card non-deletable — e.g.
  /// if this card is ever reused somewhere delete doesn't make sense.
  final Future<bool> Function(InventoryItem item)? onDelete;

  const StockItemCard({super.key, required this.item, this.onTap, this.onDelete});

  Color get _badgeBg {
    switch (item.status) {
      case StockStatus.ok:
        return AppColors.stockOkBg;
      case StockStatus.low:
        return AppColors.stockLowBg;
      case StockStatus.critical:
        return AppColors.stockCriticalBg;
    }
  }

  Color get _badgeFg {
    switch (item.status) {
      case StockStatus.ok:
        return AppColors.stockOkFg;
      case StockStatus.low:
        return AppColors.stockLowFg;
      case StockStatus.critical:
        return AppColors.stockCriticalFg;
    }
  }

  String get _badgeLabel {
    switch (item.status) {
      case StockStatus.ok:
        return 'In Stock';
      case StockStatus.low:
        return 'Low Stock';
      case StockStatus.critical:
        return 'Critical';
    }
  }

  @override
  Widget build(BuildContext context) {
    final card = GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(14),
        decoration: AppDecorations.card(),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(item.name, style: AppTextStyles.bodyBold),
                      const SizedBox(height: 2),
                      Text(item.category.label, style: AppTextStyles.caption),
                    ],
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: _badgeBg,
                    borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
                  ),
                  child: Text(
                    _badgeLabel,
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w600,
                      color: _badgeFg,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 10),
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: LinearProgressIndicator(
                value: item.progressRatio,
                minHeight: 7,
                backgroundColor: AppColors.divider,
                color: _badgeFg,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('${item.currentStock} ${item.unit}', style: AppTextStyles.caption),
                Text(
                  'Reorder at ${item.reorderThreshold} ${item.unit}',
                  style: AppTextStyles.caption,
                ),
              ],
            ),
          ],
        ),
      ),
    );

    if (onDelete == null) return card;

    return Dismissible(
      key: ValueKey(item.id),
      direction: DismissDirection.endToStart,
      // The actual delete happens here (awaited) rather than in
      // onDismissed, so a failed Firestore write returns false and the
      // card snaps back — instead of the card disappearing from the UI
      // while Firestore still has the document.
      confirmDismiss: (_) async {
        final confirmed = await _confirmDelete(context);
        if (!confirmed) return false;
        return await onDelete!(item);
      },
      background: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.symmetric(horizontal: 20),
        alignment: Alignment.centerRight,
        decoration: BoxDecoration(
          color: AppColors.stockCriticalBg,
          borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
        ),
        child: Icon(Icons.delete_outline, color: AppColors.stockCriticalFg),
      ),
      child: card,
    );
  }

  Future<bool> _confirmDelete(BuildContext context) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (dialogContext) => AlertDialog(
        title: const Text('Discontinue this product?'),
        content: Text(
          '"${item.name}" will be permanently removed from inventory. This can\'t be undone.',
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(false),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () => Navigator.of(dialogContext).pop(true),
            style: TextButton.styleFrom(foregroundColor: AppColors.stockCriticalFg),
            child: const Text('Delete'),
          ),
        ],
      ),
    );
    return confirmed ?? false;
  }
}