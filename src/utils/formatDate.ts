export type DateFormat = 'year' | 'monthYear' | 'full'

export function formatDate(dateStr: string, format: DateFormat): string {
    const date = new Date(dateStr)

    if (isNaN(date.getTime())) return 'Invalid date'

    const options: Intl.DateTimeFormatOptions =
        format === 'year'
            ? { year: 'numeric' }
            : format === 'monthYear'
            ? { month: 'long', year: 'numeric' }
            : { day: '2-digit', month: 'long', year: 'numeric' }

    return new Intl.DateTimeFormat('en-US', options).format(date)
}
