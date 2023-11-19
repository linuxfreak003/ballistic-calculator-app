import './App.css';
import {
  CreateLoadRequest,
  CreateLoadResponse,
  DragFunction,
} from './Entities';

async function CreateLoad(request: CreateLoadRequest) {
  const url = 'http://localhost:8080/ballistic/createload'
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    console.log(response);
  } catch (error) {
    console.error("Error:", error)
  }
}

export default function App() {
  CreateLoad({
    load: {
      loadId: 0,
      bullet: {
        caliber: .338,
        weight: 285,
        bc: {
          value: .356,
          dragFunction: DragFunction.DRAG_FUNCTION_G7,
        },
        length: 1.5,
      },
      muzzleVelocity: 2950,
    },
  })

  return (
    <div>
      <main>
        Ballistic Calculator
      </main>
      <h1>Create Load</h1>
    </div>
  )
}
