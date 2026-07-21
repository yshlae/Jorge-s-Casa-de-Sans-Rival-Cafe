// Pill-style branch selector chip — used at the top of the Owner
// Dashboard tab ("All Branches", "Batangas City", "Lipa", "Alangilan").

import 'package:flutter/material.dart';
import '../config/theme.dart';

class BranchFilterChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;

  const BranchFilterChip({
    super.key,
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.only(right: 8),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.coral : AppColors.cardBackground,
          borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            fontWeight: FontWeight.w600,
            color: isSelected ? AppColors.white : AppColors.ink,
          ),
        ),
      ),
    );
  }
}