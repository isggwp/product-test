import Select from 'react-select'

type OptionType = {
  value: string
  label: string
}

interface SelectProps {
  options: OptionType[]
  placeholder: string
}

const SelectComponent = ({ options, placeholder }: SelectProps) => {
  return (
    <>
      <Select
        isClearable
        placeholder={placeholder}
        styles={{
          input: (base) => ({
            ...base,
            fontSize: '0.75rem',
          }),
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
            fontSize: '0.75rem',
            cursor: 'pointer',
            backgroundColor: 'gray',
          }),
          container: (base) => ({
            ...base,
            fontSize: '0.75rem',
            outline: 'none',
          }),
          control: (base) => ({
            ...base,
            ...base,
            border: '1px solid #dbdbdb',
            boxShadow: 'none',
            '&:hover': {
              border: '1px solid black',
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#5b626b' : 'inherit',
            '&:hover': {
              backgroundColor: state.isSelected
                ? '#5b626b'
                : 'rgb(222, 235, 255)',
            },
          }),
        }}
        // menuPortalTarget={document.body}
        options={options}
      />
    </>
  )
}

export default SelectComponent
