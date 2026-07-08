export const STANDALONE_MOBILE_EDITOR_PATH = "/mobile-edit.html";
const STANDALONE_MOBILE_EDITOR_MEMO_KEY = "edgeever-standalone-mobile-editor-memo-id";
const STANDALONE_MOBILE_EDITOR_RETURN_KEY = "edgeever-standalone-mobile-editor-return-memo-id";

export const getStandaloneMobileEditorHref = (memoId: string, returnTo = "/") => {
  const params = new URLSearchParams({
    memoId,
    returnTo,
  });
  return `${STANDALONE_MOBILE_EDITOR_PATH}#${params.toString()}`;
};

export const openStandaloneMobileEditor = (memoId: string, returnTo = "/") => {
  markStandaloneMobileEditorOpened(memoId);
  window.location.href = getStandaloneMobileEditorHref(memoId, returnTo);
};

export const markStandaloneMobileEditorOpened = (memoId: string) => {
  sessionStorage.setItem(STANDALONE_MOBILE_EDITOR_MEMO_KEY, memoId);
  sessionStorage.removeItem(STANDALONE_MOBILE_EDITOR_RETURN_KEY);
};

export const markStandaloneMobileEditorReturning = (memoId: string | null) => {
  if (!memoId) {
    return;
  }

  sessionStorage.setItem(STANDALONE_MOBILE_EDITOR_RETURN_KEY, memoId);
};

export const consumeStandaloneMobileEditorReturn = (memoId: string | null) => {
  if (!memoId) {
    return false;
  }

  const returningMemoId = sessionStorage.getItem(STANDALONE_MOBILE_EDITOR_RETURN_KEY);
  const matched = returningMemoId === memoId;

  if (matched) {
    sessionStorage.removeItem(STANDALONE_MOBILE_EDITOR_RETURN_KEY);
    sessionStorage.removeItem(STANDALONE_MOBILE_EDITOR_MEMO_KEY);
  }

  return matched;
};
