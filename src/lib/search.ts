/** 전시 목록 경로 (#/exhibitions?q=검색어) */
export const EXHIBITIONS_PATH = '#/exhibitions'

/** 해시 주소에서 검색어를 꺼냅니다. 예: '#/exhibitions?q=모네' → '모네' */
export function getSearchQuery(hash = window.location.hash): string {
  const i = hash.indexOf('?')
  if (i < 0) return ''
  return (new URLSearchParams(hash.slice(i + 1)).get('q') ?? '').trim()
}

/** 검색 결과 주소를 만듭니다. 검색어가 비어 있으면 전체 목록 주소. */
export function searchHref(query: string): string {
  const q = query.trim()
  return q ? `${EXHIBITIONS_PATH}?q=${encodeURIComponent(q)}` : EXHIBITIONS_PATH
}
