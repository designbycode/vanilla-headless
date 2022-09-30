export default (value: string[], event: KeyboardEvent) => {
  return Array.from(value).includes(event.code)
}
