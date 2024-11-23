import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export interface FlashCardProp {
	song?: string,
	front?: string,
	back?: string,
	showBack: boolean
}

export default function FlashCard({ song='', front='', back='', showBack=false }: FlashCardProp) {
  return (
    <Card style={{ height: '500px', width: '320px' }}>
      <CardContent style={{ height: '460px', display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          { song }
        </Typography>
				{ !showBack && (
					<div>
						{front.split('\\n').map((part,ix) => (
							<Typography key={`front-${song}-${ix}`} variant="body2">
								{ part }
							</Typography>
						))}
					</div>
				)}
				{ showBack && (
					<div>
						{back.split('\\n').map((part, ix) => (
							<Typography key={`back-${song}-${ix}`} variant="body2" style={{ textAlign: 'left' }}>
								{ part }
							</Typography>
						))}
					</div>
				)}
      </CardContent>
    </Card>
  );
}