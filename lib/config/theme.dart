// App colors, typography, and spacing constants.
//
// Palette matches the actual Figma mockups: warm cream background,
// white/cream cards, coral-orange primary accent, sky-blue wordmark accent,
// and soft-tinted status colors for stock badges (In Stock / Low Stock /
// Critical) and recommendation urgency (Urgent / Soon).
//
// Typography: the mockup's "Jorge's Cafe" wordmark uses a chunky, rounded
// display font, while the rest of the UI uses a clean rounded-sans body
// font — plain Roboto (Flutter's default) reads as noticeably more
// "corporate" than the mockup's friendly cafe aesthetic, so this uses
// Google Fonts: Baloo 2 for the wordmark, Poppins for everything else.
//
// NOTE: hex values below are eyeballed from screenshots, not picked with a
// color picker — nudge them if you have exact values from Figma.

import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  AppColors._();

  // Core surfaces
  static const Color background = Color(0xFFF5ECDD); // warm cream page bg
  static const Color cardBackground = Color(0xFFFBF6EC); // slightly lighter card
  static const Color cardBackgroundAlt = Color(0xFFFFFFFF); // white card (login)
  static const Color divider = Color(0xFFE6DCC8);

  // Brand accents
  static const Color coral = Color(0xFFD9714A); // primary buttons, active tab/nav
  static const Color skyBlue = Color(0xFF57A9DA); // "Jorge's" wordmark accent

  // Text
  static const Color ink = Color(0xFF3A322A);
  static const Color muted = Color(0xFF8B8271);

  // Stock status — background tint + foreground text/fill
  static const Color stockOkBg = Color(0xFFDCEAD2);
  static const Color stockOkFg = Color(0xFF3E8A4F);
  static const Color stockLowBg = Color(0xFFF6E1C8);
  static const Color stockLowFg = Color(0xFFC97B3D);
  static const Color stockCriticalBg = Color(0xFFF5D8D1);
  static const Color stockCriticalFg = Color(0xFFC0503D);

  // Recommendation urgency (Resources screen)
  static const Color urgentBg = Color(0xFFF5D8D1);
  static const Color urgentFg = Color(0xFFC0503D);
  static const Color soonBg = Color(0xFFF6E1C8);
  static const Color soonFg = Color(0xFFC97B3D);

  // Order status badges (Recent Orders on Dashboard)
  static const Color statusDeliveredBg = Color(0xFFDCEAD2);
  static const Color statusDeliveredFg = Color(0xFF3E8A4F);
  static const Color statusPreparingBg = Color(0xFFDCE7E8);
  static const Color statusPreparingFg = Color(0xFF3D7E8C);
  static const Color statusPendingBg = Color(0xFFF6E1C8);
  static const Color statusPendingFg = Color(0xFFC97B3D);

  // Branch breakdown chart colors (Reports screen)
  static const Color branchColor1 = coral; // e.g. Batangas City
  static const Color branchColor2 = Color(0xFF7FAE86); // e.g. Lipa (sage green)
  static const Color branchColor3 = skyBlue; // e.g. Alangilan

  // Icon badge backgrounds for the Dashboard's Key Metrics grid
  // (Demand Forecast / Resource Status cards).
  static const Color lavenderBg = Color(0xFFE2DFF3);
  static const Color tanBg = Color(0xFFF3E1C9);

  static const Color white = Color(0xFFFFFFFF);

  // Card drop shadow — the mockup's cards have a soft, barely-there lift
  // off the cream background, not a flat/hard edge.
  static const Color cardShadow = Color(0x14000000);

  static Color? get gold => null; // ~8% black
}

/// Shared decorations so every card-style widget gets the same soft shadow
/// instead of each widget file rolling its own BoxShadow values.
class AppDecorations {
  AppDecorations._();

  static BoxDecoration card({
    Color? color,
    double radius = AppSpacing.cardRadius,
    Border? border,
  }) {
    return BoxDecoration(
      color: color ?? AppColors.cardBackground,
      borderRadius: BorderRadius.circular(radius),
      border: border,
      boxShadow: const [
        BoxShadow(color: AppColors.cardShadow, blurRadius: 10, offset: Offset(0, 3)),
      ],
    );
  }
}

class AppTextStyles {
  AppTextStyles._();

  // "Jorge's Cafe" wordmark — chunky, rounded display font.
  static TextStyle logoBlue = GoogleFonts.baloo2(
    fontSize: 26,
    fontWeight: FontWeight.w700,
    color: AppColors.skyBlue,
  );

  static TextStyle logoCoral = GoogleFonts.baloo2(
    fontSize: 26,
    fontWeight: FontWeight.w700,
    color: AppColors.coral,
  );

  static TextStyle screenTitle = GoogleFonts.poppins(
    fontSize: 20,
    fontWeight: FontWeight.w600,
    color: AppColors.ink,
  );

  static TextStyle screenSubtitle = GoogleFonts.poppins(
    fontSize: 13,
    color: AppColors.muted,
  );

  static TextStyle sectionHeader = GoogleFonts.poppins(
    fontSize: 16,
    fontWeight: FontWeight.w600,
    color: AppColors.ink,
  );

  static TextStyle body = GoogleFonts.poppins(
    fontSize: 14,
    color: AppColors.ink,
  );

  static TextStyle bodyBold = GoogleFonts.poppins(
    fontSize: 14,
    fontWeight: FontWeight.w600,
    color: AppColors.ink,
  );

  static TextStyle caption = GoogleFonts.poppins(
    fontSize: 11.5,
    color: AppColors.muted,
  );

  static TextStyle bigStat = GoogleFonts.poppins(
    fontSize: 24,
    fontWeight: FontWeight.w700,
    color: AppColors.ink,
  );

  static TextStyle buttonLabel = GoogleFonts.poppins(
    fontSize: 15,
    fontWeight: FontWeight.w600,
    color: AppColors.white,
  );
}

class AppSpacing {
  AppSpacing._();

  static const double xs = 4;
  static const double sm = 8;
  static const double md = 16;
  static const double lg = 24;
  static const double xl = 32;

  static const double cardRadius = 16;
  static const double chipRadius = 20;
  static const double buttonRadius = 26;
}

/// Dark-mode counterpart to [AppColors].
///
/// IMPORTANT CAVEAT: every screen/widget in this app currently reads
/// colors as `AppColors.xxx` static constants (not via `Theme.of(context)`),
/// so simply building a dark [ThemeData] and flipping `MaterialApp.themeMode`
/// will restyle stock Material widgets (Switch, dialogs, SnackBar, etc.)
/// but will NOT recolor custom widgets like DashboardTab's cards,
/// InventoryTab's stock chips, etc. — those will stay hardcoded to the
/// light palette until each widget is updated to look up its colors
/// dynamically (e.g. via a ThemeExtension) instead of reading `AppColors`
/// directly. This class exists so that refactor has a ready-made palette
/// to point to.
class AppColorsDark {
  AppColorsDark._();

  static const Color background = Color(0xFF221C16);
  static const Color cardBackground = Color(0xFF2E2620);
  static const Color cardBackgroundAlt = Color(0xFF2A231C);
  static const Color divider = Color(0xFF3D362C);

  static const Color coral = Color(0xFFE08661);
  static const Color skyBlue = Color(0xFF6FBBE8);

  static const Color ink = Color(0xFFF3ECDF);
  static const Color muted = Color(0xFFAFA491);

  static const Color cardShadow = Color(0x33000000);
}

/// Dark ThemeData — safe to pass to `MaterialApp(darkTheme: ..., themeMode: ...)`
/// once main.dart is wired up. See the caveat on [AppColorsDark] above.
ThemeData buildAppDarkTheme() {
  final basePoppins = GoogleFonts.poppinsTextTheme(ThemeData.dark().textTheme);

  return ThemeData(
    useMaterial3: true,
    brightness: Brightness.dark,
    scaffoldBackgroundColor: AppColorsDark.background,
    textTheme: basePoppins,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColorsDark.coral,
      brightness: Brightness.dark,
      primary: AppColorsDark.coral,
      secondary: AppColorsDark.skyBlue,
      surface: AppColorsDark.background,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: AppColorsDark.background,
      foregroundColor: AppColorsDark.ink,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.poppins(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: AppColorsDark.ink,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColorsDark.coral,
        foregroundColor: AppColorsDark.background,
        minimumSize: const Size.fromHeight(48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppSpacing.buttonRadius),
        ),
        textStyle: AppTextStyles.buttonLabel,
        elevation: 0,
      ),
    ),
    cardTheme: CardThemeData(
      color: AppColorsDark.cardBackground,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
      ),
      margin: EdgeInsets.zero,
    ),
    dividerTheme: const DividerThemeData(
      color: AppColorsDark.divider,
      thickness: 1,
    ),
  );
}

/// Central ThemeData for MaterialApp.
ThemeData buildAppTheme() {
  final basePoppins = GoogleFonts.poppinsTextTheme();

  return ThemeData(
    useMaterial3: true,
    scaffoldBackgroundColor: AppColors.background,
    textTheme: basePoppins,
    colorScheme: ColorScheme.fromSeed(
      seedColor: AppColors.coral,
      primary: AppColors.coral,
      secondary: AppColors.skyBlue,
      surface: AppColors.background,
    ),
    appBarTheme: AppBarTheme(
      backgroundColor: AppColors.background,
      foregroundColor: AppColors.ink,
      elevation: 0,
      centerTitle: false,
      titleTextStyle: GoogleFonts.poppins(
        fontSize: 18,
        fontWeight: FontWeight.w600,
        color: AppColors.ink,
      ),
    ),
    elevatedButtonTheme: ElevatedButtonThemeData(
      style: ElevatedButton.styleFrom(
        backgroundColor: AppColors.coral,
        foregroundColor: AppColors.white,
        minimumSize: const Size.fromHeight(48),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(AppSpacing.buttonRadius),
        ),
        textStyle: AppTextStyles.buttonLabel,
        elevation: 0,
      ),
    ),
    cardTheme: CardThemeData(
      color: AppColors.cardBackground,
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppSpacing.cardRadius),
      ),
      margin: EdgeInsets.zero,
    ),
    dividerTheme: const DividerThemeData(
      color: AppColors.divider,
      thickness: 1,
    ),
    // The bottom nav's rounded active-icon backdrop is custom-built (see
    // widgets/app_bottom_nav.dart) rather than themed here, since stock
    // BottomNavigationBarThemeData can't produce that look on its own.
  );
}