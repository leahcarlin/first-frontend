export function selectEntriesLoading(reduxState) {
  return reduxState.entries.loading;
}

export function selectEntries(reduxState) {
  return reduxState.entries.entries;
}
