export const PWA_UPDATE_NOTICE_EVENT = "edgeever:pwa-update-notice";

const PWA_UPDATE_RELOADED_AT_KEY = "edgeever:pwa-update-reloaded-at";

export type PwaUpdateNoticeKind = "checking" | "updated" | "reload-required";

export type PwaUpdateNoticeDetail = {
  kind: PwaUpdateNoticeKind;
};

export type PwaUpdateNoticeEvent = CustomEvent<PwaUpdateNoticeDetail>;

export const emitPwaUpdateNotice = (detail: PwaUpdateNoticeDetail) => {
  window.dispatchEvent(new CustomEvent<PwaUpdateNoticeDetail>(PWA_UPDATE_NOTICE_EVENT, { detail }));
};

export const markPwaUpdateReloadPending = () => {
  try {
    window.sessionStorage.setItem(PWA_UPDATE_RELOADED_AT_KEY, String(Date.now()));
  } catch {
    // Storage can be unavailable in restricted browsing modes.
  }
};

export const consumePwaUpdateReloadPending = () => {
  try {
    const value = window.sessionStorage.getItem(PWA_UPDATE_RELOADED_AT_KEY);
    window.sessionStorage.removeItem(PWA_UPDATE_RELOADED_AT_KEY);
    return Boolean(value);
  } catch {
    return false;
  }
};
