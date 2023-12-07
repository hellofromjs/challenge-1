const people = [
	{
		name: "Jonas",
		age: 18,
		city: 'Vilnius',
	},
	{
		name: "Ona",
		age: 30,
		city: 'Kaunas',
	},
	{
		name: "Petras",
		age: 25,
		city: 'Alytus',
	},
	{
		name: "Anrdius",
		age: 40,
		city: 'Alytus',
	},
	{
		name: "Zygimantas",
		age: 35,
		city: 'Alytus',
	},
]

const operations = {
	eq: {
		fn: (first, second) => first == second,
		text: "equal"
	},
	nq: {
		fn: (first, second) => first != second,
		text: "not equal"
	},
	gt: {
		fn: (first, second) => first > second,
		text: "greater than"
	},
	lt: {
		fn: (first, second) => first < second,
		text: "less than"
	},
}

// selectors
const properties_list = document.querySelector('#properties-list')
const operations_list = document.querySelector('#operations-list')
const filter_input = document.querySelector('#filter-input')

// initialise
void function init() {
	generate_properties_options()
	generate_operations_options()
	print_data(document.querySelector('#data-list'), people)
}()

properties_list.addEventListener('change', e => {
	filtering()
})

operations_list.addEventListener('change', e => {
	filtering()
})

filter_input.addEventListener('input', e => {
	filtering()
})

function filtering()
{
	const filtered_people = people.filter((element) => operations[operations_list.value].fn(element[properties_list.value], filter_input.value))

	const filtered_list = document.querySelector('#filtered-list')

	filtered_list.replaceChildren()

	print_data(filtered_list, filtered_people)
}

function generate_properties_options() {
	const properties = Object.keys(people[0])

	for (const property of properties) {
		const option = document.createElement('option')
		option.value = property
		option.textContent = property
		properties_list.appendChild(option)
	}
}

function generate_operations_options() {
	for (const property of Object.keys(operations)) {
		const option = document.createElement('option')
		option.value = property
		option.textContent = operations[property].text
		operations_list.appendChild(option)
	}
}

function print_data(parent, data) {
	for (const person of data) {
		const ul = document.createElement('ul')
		for (const data in person) {
			const li = document.createElement('li')
			li.textContent = `${data}: ${person[data]}`
			ul.appendChild(li)
		}
		parent.appendChild(ul)
	}
}

