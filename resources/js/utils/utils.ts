/**
 * Join classes together
 * @param classes - List of classes to join
 */
export function classNames(...classes: (string | boolean | null | undefined)[]) {
    return classes.filter(Boolean).join(' ')
}
