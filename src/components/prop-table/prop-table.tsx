import { useCallback } from 'react';
import { getDefaultValue } from '../../utils/prop-helpers';
import { cn } from '../../utils/style-helpers';
import { Table, TableCellDropdown, TableCellInput, TableCellToggle } from '../table';
import type { TableColumn } from '../table';
import styles from './prop-table.module.scss';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface PropTableProps {
  props: PropDef[];
  surface?: 'paper' | 'chalkboard';
  selectedValues?: Record<string, string | boolean>;
  onValueChange?: (propName: string, value: string | boolean) => void;
}

function parseOptions(type: string): string[] | null {
  const match = type.match(/^'(.+)'$/);
  if (!match) return null;
  return match[1].split("' | '");
}

function isEditableType(type: string): 'number' | 'string' | null {
  if (type === 'number') return 'number';
  if (type === 'string') return 'string';
  return null;
}

function PropValue({
  prop,
  surface,
  selectedValue,
  onValueChange,
}: {
  prop: PropDef;
  surface: 'paper' | 'chalkboard';
  selectedValue: string | boolean | undefined;
  onValueChange: (value: string | boolean) => void;
}) {
  const options = parseOptions(prop.type);
  const isBoolean = prop.type === 'boolean';
  const editable = isEditableType(prop.type);

  if (isBoolean) {
    return (
      <TableCellToggle
        checked={selectedValue === true}
        surface={surface}
        onChange={onValueChange}
      />
    );
  }

  if (editable) {
    const val = typeof selectedValue === 'string' ? selectedValue : (prop.default ?? '');
    return (
      <TableCellInput
        kind={editable}
        value={val}
        placeholder={prop.default ?? prop.type}
        surface={surface}
        onChange={(v) => onValueChange(v)}
      />
    );
  }

  if (options) {
    const current = typeof selectedValue === 'string' ? selectedValue : options[0];
    return (
      <TableCellDropdown
        options={options}
        value={current}
        surface={surface}
        onChange={onValueChange}
      />
    );
  }

  return (
    <span className={cn(styles.codeName, surface === 'chalkboard' && styles.chalkCodeName)}>
      {prop.type}
    </span>
  );
}

export function PropTable({
  props,
  surface = 'paper',
  selectedValues,
  onValueChange,
}: PropTableProps) {
  const handleChange = useCallback(
    (propName: string, value: string | boolean) => {
      onValueChange?.(propName, value);
    },
    [onValueChange],
  );

  const columns: TableColumn<PropDef>[] = [
    {
      key: 'name',
      header: 'Prop',
      cell: (prop) => (
        <code className={cn(styles.codeName, surface === 'chalkboard' && styles.chalkCodeName)}>
          {prop.name}
          {prop.required && (
            <span className={cn(styles.required, surface === 'chalkboard' && styles.chalkRequired)}>
              *
            </span>
          )}
        </code>
      ),
    },
    {
      key: 'value',
      header: 'Value',
      cell: (prop) => (
        <PropValue
          prop={prop}
          surface={surface}
          selectedValue={selectedValues?.[prop.name]}
          onValueChange={(v) => handleChange(prop.name, v)}
        />
      ),
    },
    {
      key: 'description',
      header: 'Description',
      cell: (prop) => (
        <span className={cn(styles.desc, surface === 'chalkboard' && styles.chalkDesc)}>
          {prop.description}
        </span>
      ),
    },
  ];

  return (
    <Table
      data={props}
      columns={columns}
      surface={surface}
      className={cn(styles.wrapper, surface === 'chalkboard' && styles.chalkboard)}
    />
  );
}
