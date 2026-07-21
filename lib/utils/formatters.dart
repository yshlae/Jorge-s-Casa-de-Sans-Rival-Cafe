// Currency, percentage, and compact-number formatting helpers.
// Kept dependency-free (no intl package) since the formatting needs here
// are simple: peso currency with thousands separators, signed percentages.

String formatCurrency(double amount) {
  final isNegative = amount < 0;
  final value = amount.abs();
  final wholePart = value.truncate();
  final wholeStr = wholePart.toString();

  final buffer = StringBuffer();
  for (int i = 0; i < wholeStr.length; i++) {
    if (i > 0 && (wholeStr.length - i) % 3 == 0) buffer.write(',');
    buffer.write(wholeStr[i]);
  }
  return '${isNegative ? '-' : ''}\u20b1${buffer.toString()}';
}

String formatCompactNumber(int value) {
  final str = value.toString();
  return str.replaceAllMapped(
    RegExp(r'(\d)(?=(\d{3})+(?!\d))'),
    (m) => '${m[1]},',
  );
}

String formatPercent(double value, {bool showSign = true}) {
  final sign = showSign && value > 0 ? '+' : '';
  return '$sign${value.toStringAsFixed(1)}%';
}

const _monthNames = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/// Formats a DateTime as "Jul 13, 9:02 AM" — matches the style shown on
/// the Inventory > Adjustments tab in the mockup.
String formatDateTime(DateTime dt) {
  final month = _monthNames[dt.month - 1];
  final hour12 = dt.hour % 12 == 0 ? 12 : dt.hour % 12;
  final minute = dt.minute.toString().padLeft(2, '0');
  final period = dt.hour >= 12 ? 'PM' : 'AM';
  return '$month ${dt.day}, $hour12:$minute $period';
}