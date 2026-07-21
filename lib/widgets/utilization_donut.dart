// Circular "Overall Utilization" chart on the Owner > Resources tab.
// Simple ring built from CircularProgressIndicator rather than a custom
// painter — matches the mockup's clean single-color arc closely enough
// for this prototype.

import 'package:flutter/material.dart';
import '../config/theme.dart';

class UtilizationDonut extends StatelessWidget {
  final int percent;
  final double size;

  const UtilizationDonut({super.key, required this.percent, this.size = 84});

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: size,
            height: size,
            child: CircularProgressIndicator(
              value: percent / 100,
              strokeWidth: 9,
              color: AppColors.coral,
              backgroundColor: AppColors.divider,
              strokeCap: StrokeCap.round,
            ),
          ),
          Text(
            '$percent%',
            style: const TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppColors.ink,
            ),
          ),
        ],
      ),
    );
  }
}