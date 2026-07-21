// One of the three colored count chips at the top of the Inventory tab
// ("5 In Stock", "4 Low Stock", "3 Critical").

import 'package:flutter/material.dart';
import '../config/theme.dart';

class StatChip extends StatelessWidget {
  final int count;
  final String label;
  final Color background;
  final Color foreground;

  const StatChip({
    super.key,
    required this.count,
    required this.label,
    required this.background,
    required this.foreground,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: background,
          borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
        ),
        child: Column(
          children: [
            Text(
              '$count',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: foreground,
              ),
            ),
            const SizedBox(height: 2),
            Text(
              label,
              style: TextStyle(fontSize: 12, color: foreground),
            ),
          ],
        ),
      ),
    );
  }
}