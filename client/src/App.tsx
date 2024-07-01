import { create } from '@stylexjs/stylex';
import { TaxCalculator } from './scenes/TaxCalculator';
import { sx } from './styles/sx';

function App() {
  return (
    <div {...sx(root)}>
      <TaxCalculator {...sx(calculator)} />
    </div>
  );
}

const { root, calculator } = create({
  root: {
    height: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculator: {
    maxWidth: 500,
    width: '100%',
  },
});

export default App;
