import styled from "styled-components";

export const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const DateRange = styled.p`
  font-weight: bold;
  color: #88a04d;
`;

export const Section = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid #eee;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
`;

export const AnimalSection = styled(Section)<{ $isColorVariant?: boolean }>`
  border-left: 5px solid ${(props) => (props.$isColorVariant ? "#D4AF37" : "#88a04d")};
`;

export const AnimalHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f9f9f9;
  padding-bottom: 10px;

  h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #333;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ColorLabel = styled.small`
  color: #c09e0a;
  text-transform: uppercase;
  font-size: 0.7rem;
  font-weight: 900;
`;

export const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 12px;
  color: #5d7a2a;
`;

export const SubmitSection = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-bottom: 50px;
`;
