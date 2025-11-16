import Getdp from '@/components/Getdp';

export const dynamic = 'force-static';

export default function HomePage() {
	return (
		<main className="flex min-h-screen w-full justify-center bg-background px-4 pb-16 pt-12 text-white">
			<Getdp />
		</main>
	);
}
