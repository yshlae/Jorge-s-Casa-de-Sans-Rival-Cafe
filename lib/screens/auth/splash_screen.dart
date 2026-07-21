// Splash screen — matches the mockup: centered "Jorge's Cafe" wordmark
// (blue "Jorge's" + coral "Cafe" + a small italic phonetic hint), a
// tagline near the bottom, and a loading percentage that counts up before
// auto-navigating to the Login screen.

import 'dart:async';
import 'package:flutter/material.dart';
import '../../config/routes.dart';
import '../../config/theme.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  int _progress = 0;
  Timer? _timer;

  @override
  void initState() {
    super.initState();
    // Ticks from 0 to 100 over ~1.7s, then hands off to the Login screen —
    // purely cosmetic, there's no real asset loading happening here.
    _timer = Timer.periodic(const Duration(milliseconds: 60), (timer) {
      setState(() {
        _progress += 5;
      });
      if (_progress >= 100) {
        timer.cancel();
        Future.delayed(const Duration(milliseconds: 250), () {
          if (mounted) {
            Navigator.of(context).pushReplacementNamed(AppRoutes.login);
          }
        });
      }
    });
  }

  @override
  void dispose() {
    _timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final clampedProgress = _progress > 100 ? 100 : _progress;

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Column(
          children: [
            const Spacer(flex: 5),
            Center(
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Image.asset(
                    'lib/assets/images/logo.png',
                    width: 200,
                    height: 100,
                  ),
                  const SizedBox(height: 14),
                  Row(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.baseline,
                    textBaseline: TextBaseline.alphabetic,
                    children: [
                      Text("SanServeAll", style: AppTextStyles.logoBlue.copyWith(fontSize: 34)),
                      const SizedBox(width: 4),
                      Text('Mobile', style: AppTextStyles.logoCoral.copyWith(fontSize: 30)),
                    ],
                  ),
                  const SizedBox(height: 2),
                  Text(
                    "{ Final Project | Midterm Class }",
                    style: TextStyle(
                      fontSize: 12,
                      fontStyle: FontStyle.italic,
                      color: AppColors.muted,
                    ),
                  ),
                ],
              ),
            ),
            const Spacer(flex: 6),
            RichText(
              text: TextSpan(
                style: const TextStyle(fontSize: 13, fontStyle: FontStyle.italic),
                children: [
                  TextSpan(
                    text: 'a Necessity, not a ',
                    style: TextStyle(color: AppColors.ink.withValues(alpha: 0.75)),
                  ),
                  TextSpan(
                    text: 'Luxury',
                    style: const TextStyle(
                      color: AppColors.coral,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
            const SizedBox(height: 14),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: AppColors.cardBackground,
                borderRadius: BorderRadius.circular(AppSpacing.chipRadius),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  SizedBox(
                    width: 14,
                    height: 14,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      value: clampedProgress / 100,
                      color: AppColors.coral,
                      backgroundColor: AppColors.divider,
                    ),
                  ),
                  const SizedBox(width: 8),
                  Text(
                    'Loading...$clampedProgress%',
                    style: AppTextStyles.caption,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 48),
          ],
        ),
      ),
    );
  }
}