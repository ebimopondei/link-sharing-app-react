import Header from "./header";

export default function MainLayout({children}: { children: React.ReactNode}){
    return (
        <div className="space-y-4 bg-black-4000">
                <Header />
                {children}
            </div>
    )
}