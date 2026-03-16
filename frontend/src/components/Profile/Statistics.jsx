import { MdArrowBack } from "react-icons/md";
import Loading from "../../Loading";
// import { Stage, Layer, Rect, Circle, Text } from 'react-konva';

export default function Statistics({onBack, matchData})
{
  return (
    <div className="w-full h-screen bg-[linear-gradient(to_bottom,#162D2A,#2F3A32,#3E2411)] flex flex-col">
        <header className="flex relative items-center px-[25px] py-[16px] border-b border-[#FFFFFF1A]">
            <button
                onClick={onBack}
                className="flex items-center justify-center w-[40px] h-[40px] rounded-full hover:bg-[#FFFFFF0A] transition-colors"
                >
                <MdArrowBack size={24} color="#FFFFFF" />
            </button>
            {/* <div className='absolute left-1/2 -translate-x-1/2 text-xl font-bold'>
                <h1 className="text-white text-[20px] font-semibold">Match History</h1>
            </div> */}
            
        </header>

    {matchData && (
           <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
             <h3>📊 Your Stats</h3>
             <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
               <div><strong>Win Rate:</strong> {matchData.stats.winRate}</div>
               <div><strong>Wins:</strong> {matchData.stats.totalWins}</div>
               <div><strong>Losses:</strong> {matchData.stats.totalLosses}</div>
             </div>
          
           </div>
         ) }
    </div>
    );
}