import * as fs from 'fs';
import { join } from 'path';

/** Read Images Folder and Create Components */
fs.readdirSync(join(__dirname, 'images')).forEach((item) => {
	/* Create Components Folder */
	fs.mkdirSync(join(__dirname, 'components'), { recursive: true });

	/* Copy to Components Folder */
	fs.copyFileSync(
		join(__dirname, 'images', item),
		join(__dirname, 'components', item.replace('-', '_'))
	);

	/* Create Component Properties File */
	fs.writeFileSync(
		join(
			__dirname,
			'components',
			item.split('.')[0].replace('-', '_') + '.json'
		),
		`{"name" : "${item.split('.')[0].replace('-', '_')}"}`
	);

	let content = fs.readFileSync(join(__dirname, 'images', item), 'utf-8');

	content = content.replace(`width="24"`, '').replace(`height="24"`, '');

	fs.writeFileSync(
		join(
			__dirname,
			'components',
			item.split('.')[0].replace('-', '_') + '.jsx'
		),
		`
		const Icon = () => {
			return (
		
					${content}
			);
		};
		
		render(<Icon/>)
		
		`
	);
});

/* Pack */

const newExtension: Extension = { components: [] };

console.log('Packaging Extension...');

/* Load Info */
newExtension.info = JSON.parse(
	fs.readFileSync(join(__dirname, 'info.json'), 'utf-8')
);

/* Load Logo */
newExtension.logo =
	'data:image/png;base64,' +
	fs.readFileSync(join(__dirname, 'logo.png'), 'base64');

/* Load Components */
const components = fs
	.readdirSync(join(__dirname, 'components'))
	.filter((item) => item.endsWith('.json'));

for (const item of components) {
	let newComponent: {
		properties?: {};
		code?: string;
		image?: string;
	} = {};

	/* Get Component Properties */
	newComponent.properties = JSON.parse(
		fs.readFileSync(join(__dirname, 'components', item), 'utf-8')
	);

	const name = item.split('.')[0];

	if (
		fs.existsSync(join(__dirname, 'components', 'components', name + '.png'))
	) {
		newComponent.image =
			'data:image/png;base64,' +
			fs.readFileSync(join(__dirname, 'components', name + '.png'), 'base64');
	}

	if (fs.existsSync(join(__dirname, 'components', name + '.svg'))) {
		newComponent.image = fs.readFileSync(
			join(__dirname, 'components', name + '.svg'),
			'utf-8'
		);
	}

	if (fs.existsSync(join(__dirname, 'components', name + '.jsx'))) {
		newComponent.code = fs.readFileSync(
			join(__dirname, 'components', name + '.jsx'),
			'utf-8'
		);
	}

	newExtension.components.push(newComponent);
}

fs.writeFileSync(
	join(__dirname, newExtension.info?.name + '.kext'),
	JSON.stringify(newExtension)
);

console.log('Finished');
console.log(`Extension Name: ${newExtension.info?.name}`);
console.log(`${newExtension.components.length} Controls`);

interface Extension {
	info?: {
		name: string;
		author: string;
		description: string;
		version: string;
	};
	logo?: string;
	components: { properties?: {}; code?: string; image?: string }[];
}
