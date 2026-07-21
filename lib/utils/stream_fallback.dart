// Generic offline-safe wrappers for Firestore streams and futures.
//
// WHY THIS EXISTS: for a live demo, venue wifi can't always be trusted.
// Rather than the app hanging on a loading spinner (or crashing) when
// Firestore is unreachable, every read in services/ is wrapped with these
// helpers so it falls back to local mock data after a short timeout —
// the app still looks fully populated even with zero connectivity.
//
// If Firestore DOES respond (even if slightly late), real data takes over
// immediately and the mock fallback is simply discarded.

import 'dart:async';

/// Wraps a live Firestore stream. If no value arrives within [timeout], or
/// the stream errors before ever emitting, [mockData] is emitted instead.
/// Once real data arrives, it always takes priority over the mock value.
Stream<T> withMockFallback<T>({
  required Stream<T> source,
  required T mockData,
  Duration timeout = const Duration(seconds: 4),
}) {
  late StreamController<T> controller;
  StreamSubscription<T>? subscription;
  Timer? timer;
  bool receivedRealData = false;

  controller = StreamController<T>(
    onListen: () {
      timer = Timer(timeout, () {
        if (!receivedRealData && !controller.isClosed) {
          controller.add(mockData);
        }
      });

      subscription = source.listen(
        (data) {
          receivedRealData = true;
          timer?.cancel();
          if (!controller.isClosed) controller.add(data);
        },
        onError: (Object error, StackTrace stackTrace) {
          if (!receivedRealData && !controller.isClosed) {
            controller.add(mockData);
          }
          // Swallow further errors after the fallback is shown — a flaky
          // connection retrying in the background shouldn't crash the UI.
        },
      );
    },
    onCancel: () {
      timer?.cancel();
      subscription?.cancel();
    },
  );

  return controller.stream;
}

/// Wraps a one-off Firestore fetch (e.g. login's user lookup). If it
/// doesn't complete within [timeout], or throws, [mockData] is returned
/// instead of letting the caller hang or crash.
Future<T> withMockFallbackFuture<T>({
  required Future<T> Function() source,
  required T mockData,
  Duration timeout = const Duration(seconds: 4),
}) async {
  try {
    return await source().timeout(timeout);
  } catch (_) {
    return mockData;
  }
}