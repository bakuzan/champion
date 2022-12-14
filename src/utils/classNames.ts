type ClassesTypes = string | boolean | null | undefined;

export default function classNames(...args: (ClassesTypes | ClassesTypes[])[]) {
  const options = args.reduce<ClassesTypes[]>(
    (p, c) => (c instanceof Array ? [...p, ...c] : [...p, c]),
    [] as ClassesTypes[]
  );

  return options.filter((x) => !!x).join(' ');
}
