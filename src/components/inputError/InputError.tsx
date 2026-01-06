export default function InputError({ error }: { error: string | undefined }) {
    return <>{error && <p style={{ color: 'red' }}>{JSON.stringify(error)}</p>}</>;
}