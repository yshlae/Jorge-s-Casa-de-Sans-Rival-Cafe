// Login screen — matches the mockup: a white card centered over the cream
// background, with the wordmark, email/password fields, a coral "Sign In"
// button, and the demo credentials shown as a hint.
//
// No real authentication — see auth_state.dart for how the two demo
// accounts (Owner / Staff) are checked.

import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../config/routes.dart';
import '../../config/theme.dart';
import '../../models/user.dart';
import '../../services/branch_service.dart';
import '../../state/auth_state.dart';
import '../../state/staff_state.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final _emailController = TextEditingController(text: 'admin@jorgescafe.com');
  final _passwordController = TextEditingController(text: 'admin123');
  bool _obscurePassword = true;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  Future<void> _handleSignIn() async {
    final authState = context.read<AuthState>();
    final success = await authState.login(
      _emailController.text,
      _passwordController.text,
    );
    if (!success || !mounted) return;

    final user = authState.currentUser!;
    if (user.role == UserRole.owner) {
      Navigator.of(context).pushReplacementNamed(AppRoutes.ownerHome);
    } else {
      // Staff: resolve a human-readable branch name before initializing
      // StaffState, since the user doc only stores a branchId.
      String branchName = user.branchId ?? '';
      try {
        final branches = await BranchService().fetchBranches();
        final match = branches.where((b) => b.id == user.branchId);
        if (match.isNotEmpty) branchName = match.first.name;
      } catch (_) {
        // Fall back to the raw branchId if Firestore isn't reachable yet —
        // the screen will still work, just with a less pretty label.
      }
      if (!mounted) return;
      context.read<StaffState>().initialize(
        branchId: user.branchId ?? '',
        branchName: branchName,
      );
      Navigator.of(context).pushReplacementNamed(AppRoutes.staffHome);
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = context.watch<AuthState>();

    return Scaffold(
      backgroundColor: AppColors.background,
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: AppColors.cardBackgroundAlt,
                borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
                boxShadow: [
                  BoxShadow(
                    color: Colors.black.withValues(alpha: 0.06),
                    blurRadius: 20,
                    offset: const Offset(0, 8),
                  ),
                ],
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Center(
                    child: Column(
                      children: [
                        Image.asset(
                          'lib/assets/images/logo.png',
                          width: 200,
                          height: 100,
                        ),
                        const SizedBox(height: 10),
                        Row(
                          mainAxisSize: MainAxisSize.min,
                          crossAxisAlignment: CrossAxisAlignment.baseline,
                          textBaseline: TextBaseline.alphabetic,
                          children: [
                            Text("SanServeAll", style: AppTextStyles.logoBlue),
                            const SizedBox(width: 3),
                            Text('Mobile', style: AppTextStyles.logoCoral),
                            const SizedBox(width: 4),
                            Text(
                              "{'Final Project'}",
                              style: TextStyle(
                                fontSize: 11,
                                fontStyle: FontStyle.italic,
                                color: AppColors.muted,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 10),
                        Text(
                          'Sign in to your account',
                          style: AppTextStyles.body,
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),

                  Text('Email', style: AppTextStyles.bodyBold),
                  const SizedBox(height: 6),
                  TextField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    decoration: _fieldDecoration('your@email.com'),
                  ),
                  const SizedBox(height: 16),

                  Text('Password', style: AppTextStyles.bodyBold),
                  const SizedBox(height: 6),
                  TextField(
                    controller: _passwordController,
                    obscureText: _obscurePassword,
                    decoration: _fieldDecoration('••••••••').copyWith(
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                          color: AppColors.muted,
                          size: 20,
                        ),
                        onPressed: () {
                          setState(() => _obscurePassword = !_obscurePassword);
                        },
                      ),
                    ),
                  ),

                  if (authState.errorMessage != null) ...[
                    const SizedBox(height: 12),
                    Text(
                      authState.errorMessage!,
                      style: const TextStyle(
                        color: AppColors.stockCriticalFg,
                        fontSize: 12.5,
                      ),
                    ),
                  ],

                  const SizedBox(height: 20),
                  ElevatedButton(
                    onPressed: authState.isLoading ? null : _handleSignIn,
                    child: authState.isLoading
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              color: AppColors.white,
                            ),
                          )
                        : const Row(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Icon(
                                Icons.login,
                                size: 18,
                                color: AppColors.white,
                              ),
                              SizedBox(width: 8),
                              Text('Sign In'),
                            ],
                          ),
                  ),

                  const SizedBox(height: 16),
                  Center(
                    child: Text(
                      'Demo Credentials:\nadmin@jorgescafe.com / admin123',
                      textAlign: TextAlign.center,
                      style: AppTextStyles.caption,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  InputDecoration _fieldDecoration(String hint) {
    return InputDecoration(
      hintText: hint,
      hintStyle: TextStyle(color: AppColors.muted.withValues(alpha: 0.7)),
      filled: true,
      fillColor: AppColors.background,
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(14),
        borderSide: BorderSide.none,
      ),
    );
  }
}